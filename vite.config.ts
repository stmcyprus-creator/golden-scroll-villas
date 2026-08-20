// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static build: every route is rendered to HTML at build time into dist/client,
    // so the output can be hosted on any static host without a Node runtime.
    prerender: {
      enabled: true,
      crawlLinks: true,
      failOnError: true,
    },
    pages: [
      { path: "/", prerender: { enabled: true } },
      { path: "/privacy", prerender: { enabled: true } },
    ],
  },
});
