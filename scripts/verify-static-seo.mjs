#!/usr/bin/env node
/**
 * Post-build check: verifies that every prerendered page contains
 * title, description, og:*, twitter:card, canonical and valid JSON-LD
 * directly in the static HTML (no runtime/JS required).
 *
 * Also verifies that canonical and og:url on every page point at the
 * same base URL (SEO_BASE_URL / VITE_SITE_URL env, with a project default).
 *
 * Runs automatically after `npm run build`. Exit code 1 on any failure.
 */
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT_DIR = join(process.cwd(), "dist", "client");

const BASE_URL = (
  process.env.SEO_BASE_URL ||
  process.env.VITE_SITE_URL ||
  "https://golden-scroll-villas.lovable.app"
).replace(/\/+$/, "");

/** Pages that must exist in the static output. */
const REQUIRED_PAGES = [
  "index.html",
  join("privacy", "index.html"),
  join("cookie", "index.html"),
];

/** Values that must never survive into a production build. */
const PLACEHOLDERS = [
  "",
  "/",
  "#",
  "http://localhost",
  "https://example.com",
  "https://your-domain.com",
  "TODO",
  "Lovable App",
  "Lovable Generated Project",
];

/** Expected JSON-LD @type per page (any one of them must be present). */
const EXPECTED_JSONLD = {
  "index.html": ["RealEstateAgent", "Organization", "LocalBusiness"],
  [join("privacy", "index.html")]: ["WebPage", "PrivacyPolicy"],
  [join("cookie", "index.html")]: ["WebPage"],
};
const DEFAULT_JSONLD_TYPES = ["WebPage", "WebSite", "Organization"];

const CHECKS = [
  { name: "<title>", test: (h) => /<title[^>]*>[^<]{10,}<\/title>/i.test(h) },
  { name: 'meta name="description"', test: (h) => hasMeta(h, "name", "description") },
  { name: 'meta property="og:title"', test: (h) => hasMeta(h, "property", "og:title") },
  { name: 'meta property="og:description"', test: (h) => hasMeta(h, "property", "og:description") },
  { name: 'meta property="og:type"', test: (h) => hasMeta(h, "property", "og:type") },
  { name: 'meta property="og:url"', test: (h) => hasMeta(h, "property", "og:url") },
  { name: 'meta name="twitter:card"', test: (h) => hasMeta(h, "name", "twitter:card") },
  { name: 'link rel="canonical"', test: (h) => Boolean(getCanonical(h)) },
];

function esc(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getMeta(html, attr, value) {
  const a = esc(value);
  const direct = new RegExp(`<meta[^>]+${attr}=["']${a}["'][^>]*content=["']([^"']*)["']`, "i");
  const swapped = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*${attr}=["']${a}["']`, "i");
  const m = html.match(direct) || html.match(swapped);
  return m ? decodeEntities(m[1]).trim() : null;
}

function hasMeta(html, attr, value) {
  const v = getMeta(html, attr, value);
  return Boolean(v && v.length >= 3);
}

function getCanonical(html) {
  const direct = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const swapped = html.match(/<link[^>]+href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const m = direct || swapped;
  return m ? decodeEntities(m[1]).trim() : null;
}

function decodeEntities(s) {
  return s
    .replace(/\\u003c/gi, "<")
    .replace(/\\u003e/gi, ">")
    .replace(/\\u0026/gi, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function expectedUrlFor(rel) {
  const path = rel === "index.html" ? "/" : `/${rel.split(sep).slice(0, -1).join("/")}`;
  return `${BASE_URL}${path}`;
}

function normalizeUrl(u) {
  return u.replace(/\/+$/, "") || "/";
}

function collectJsonLd(html) {
  return [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) =>
    decodeEntities(m[1].trim()),
  );
}

function flattenNodes(data) {
  if (Array.isArray(data)) return data.flatMap(flattenNodes);
  if (data && typeof data === "object") {
    if (Array.isArray(data["@graph"])) return [data, ...data["@graph"].flatMap(flattenNodes)];
    return [data];
  }
  return [];
}

function checkJsonLd(html, rel, errors) {
  const blocks = collectJsonLd(html);
  if (blocks.length === 0) {
    errors.push(`${rel}: нет JSON-LD (application/ld+json)`);
    return;
  }

  const types = new Set();
  for (const [i, raw] of blocks.entries()) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      errors.push(`${rel}: JSON-LD #${i + 1} — невалидный JSON (${e.message})`);
      continue;
    }
    const nodes = flattenNodes(data);
    if (nodes.length === 0) {
      errors.push(`${rel}: JSON-LD #${i + 1} — пустая структура`);
      continue;
    }
    const rootContext = Array.isArray(data) ? nodes[0]?.["@context"] : data["@context"];
    if (!/^https?:\/\/schema\.org\/?$/.test(String(rootContext ?? ""))) {
      errors.push(`${rel}: JSON-LD #${i + 1} — @context должен быть https://schema.org (сейчас: ${rootContext})`);
    }
    for (const node of nodes) {
      if (!node["@type"]) {
        errors.push(`${rel}: JSON-LD #${i + 1} — узел без @type`);
        continue;
      }
      for (const t of [].concat(node["@type"])) types.add(t);
    }
  }

  const expected = EXPECTED_JSONLD[rel] ?? DEFAULT_JSONLD_TYPES;
  if (!expected.some((t) => types.has(t))) {
    errors.push(`${rel}: JSON-LD @type — ожидался один из [${expected.join(", ")}], найдено [${[...types].join(", ") || "—"}]`);
  }
}

function checkUrls(html, rel, errors) {
  const expected = expectedUrlFor(rel);
  const canonical = getCanonical(html);
  const ogUrl = getMeta(html, "property", "og:url");

  for (const [label, value] of [
    ["canonical", canonical],
    ["og:url", ogUrl],
  ]) {
    if (!value) {
      errors.push(`${rel}: ${label} отсутствует`);
      continue;
    }
    if (PLACEHOLDERS.some((p) => value === p || (p && value.startsWith(p)))) {
      errors.push(`${rel}: ${label} содержит дефолтное/пустое значение "${value}"`);
      continue;
    }
    if (!value.startsWith(`${BASE_URL}/`) && normalizeUrl(value) !== normalizeUrl(BASE_URL)) {
      errors.push(`${rel}: ${label} "${value}" не соответствует baseUrl ${BASE_URL}`);
      continue;
    }
    if (normalizeUrl(value) !== normalizeUrl(expected)) {
      errors.push(`${rel}: ${label} "${value}" не совпадает с адресом страницы ${expected}`);
    }
  }

  const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1];
  if (title && ["Lovable App", "Lovable Generated Project"].includes(decodeEntities(title).trim())) {
    errors.push(`${rel}: дефолтный <title> "${title.trim()}"`);
  }
}

async function collectHtml(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await collectHtml(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error(`[seo-check] Не найдена папка сборки: ${OUT_DIR}`);
    process.exit(1);
  }

  const files = await collectHtml(OUT_DIR);
  const rels = files.map((f) => relative(OUT_DIR, f));
  const errors = [];

  for (const page of REQUIRED_PAGES) {
    if (!rels.includes(page)) errors.push(`${page}: страница не пререндерена`);
  }

  for (const file of files) {
    const rel = relative(OUT_DIR, file);
    const html = await readFile(file, "utf8");
    for (const check of CHECKS) {
      if (!check.test(html)) errors.push(`${rel}: отсутствует ${check.name}`);
    }
    checkJsonLd(html, rel, errors);
    checkUrls(html, rel, errors);
  }

  console.log(`[seo-check] baseUrl: ${BASE_URL}`);
  if (errors.length) {
    console.error(`\n[seo-check] Провалено ${errors.length} проверок:`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }

  console.log(
    `[seo-check] OK — ${files.length} страниц: title, og:*, twitter, canonical, JSON-LD (@context/@type) вшиты в HTML.`,
  );
}

main().catch((err) => {
  console.error("[seo-check] Ошибка:", err);
  process.exit(1);
});
