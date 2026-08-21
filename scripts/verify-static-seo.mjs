#!/usr/bin/env node
/**
 * Post-build check: verifies that every prerendered page contains
 * title, description, og:*, twitter:card, canonical and JSON-LD
 * directly in the static HTML (no runtime/JS required).
 *
 * Runs automatically after `npm run build`.
 */
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT_DIR = join(process.cwd(), "dist", "client");

/** Pages that must exist in the static output. */
const REQUIRED_PAGES = ["index.html", join("privacy", "index.html")];

/** Checks applied to every prerendered HTML file. */
const CHECKS = [
  { name: "<title>", test: (h) => /<title[^>]*>[^<]{10,}<\/title>/i.test(h) },
  { name: 'meta name="description"', test: (h) => hasMeta(h, "name", "description") },
  { name: 'meta property="og:title"', test: (h) => hasMeta(h, "property", "og:title") },
  { name: 'meta property="og:description"', test: (h) => hasMeta(h, "property", "og:description") },
  { name: 'meta property="og:type"', test: (h) => hasMeta(h, "property", "og:type") },
  { name: 'meta property="og:url"', test: (h) => hasMeta(h, "property", "og:url") },
  { name: 'meta name="twitter:card"', test: (h) => hasMeta(h, "name", "twitter:card") },
  { name: 'link rel="canonical"', test: (h) => /<link[^>]+rel=["']canonical["'][^>]*>/i.test(h) },
  { name: "JSON-LD (application/ld+json)", test: hasValidJsonLd, appliesTo: ["index.html"] },
];

function hasMeta(html, attr, value) {
  const re = new RegExp(
    `<meta[^>]+${attr}=["']${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*content=["'][^"']{3,}["']`,
    "i",
  );
  const reSwapped = new RegExp(
    `<meta[^>]+content=["'][^"']{3,}["'][^>]*${attr}=["']${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`,
    "i",
  );
  return re.test(html) || reSwapped.test(html);
}

function hasValidJsonLd(html) {
  const matches = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
  if (matches.length === 0) return false;
  return matches.every((m) => {
    try {
      const data = JSON.parse(decodeEntities(m[1].trim()));
      return Boolean(data && (data["@context"] || Array.isArray(data)));
    } catch {
      return false;
    }
  });
}

function decodeEntities(s) {
  return s
    .replace(/\\u003c/gi, "<")
    .replace(/\\u003e/gi, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
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
      if (check.appliesTo && !check.appliesTo.includes(rel.split(sep).join(sep))) continue;
      if (!check.test(html)) errors.push(`${rel}: отсутствует ${check.name}`);
    }
  }

  if (errors.length) {
    console.error(`\n[seo-check] Провалено ${errors.length} проверок:`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }

  console.log(`[seo-check] OK — ${files.length} страниц: title, og:*, twitter, canonical, JSON-LD вшиты в HTML.`);
}

main().catch((err) => {
  console.error("[seo-check] Ошибка:", err);
  process.exit(1);
});
