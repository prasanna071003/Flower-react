import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Placeholder used in generated robots.txt / sitemap.xml when VITE_SITE_URL
// is not set. It is intentionally not a real domain.
const DOMAIN_MARKER = "https://REPLACE-WITH-YOUR-DOMAIN";

const PUBLIC_PATHS = ["/", "/about", "/flowers", "/services", "/gallery", "/contact"];

function buildSeoFiles(siteUrl) {
  const origin = (siteUrl || "").trim().replace(/\/+$/, "") || DOMAIN_MARKER;
  const configured = origin !== DOMAIN_MARKER;
  const noteLine = configured
    ? `Generated at build time from VITE_SITE_URL (${origin}).`
    : `VITE_SITE_URL is not set: replace every occurrence of ${DOMAIN_MARKER} below, or set VITE_SITE_URL in .env and rebuild.`;

  const robots = [
    "# Noor & Bloom Flower Boutique",
    `# ${noteLine}`,
    "",
    "User-agent: *",
    "Allow: /",
    "",
    "# Private / account pages — not for search engines",
    "Disallow: /login",
    "Disallow: /register",
    "Disallow: /checkout",
    "Disallow: /dashboard",
    "Disallow: /admin",
    "",
    "# Alternate / placeholder pages (kept out of the index)",
    "Disallow: /extra",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  ].join("\n");

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<!--",
    "  Noor & Bloom Flower Boutique — XML sitemap.",
    `  ${noteLine}`,
    "  Flower detail pages (/flower-details/:id) are generated from the database",
    "  and change over time, so they are not listed here. Search engines will",
    "  discover them by crawling the /flowers collection pages.",
    "-->",
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...PUBLIC_PATHS.map((p) => `  <url><loc>${origin}${p}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");

  return { robots, sitemap };
}

function seoFilesPlugin() {
  let siteUrl = "";
  let outDir = "dist";

  return {
    name: "noor-bloom-seo-files",
    configResolved(config) {
      const env = loadEnv(config.mode, config.envDir, "VITE_");
      siteUrl = process.env.VITE_SITE_URL || env.VITE_SITE_URL || "";
      outDir = path.resolve(config.root, config.build.outDir);
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || "").split("?")[0];
        if (url !== "/robots.txt" && url !== "/sitemap.xml") return next();
        const { robots, sitemap } = buildSeoFiles(siteUrl);
        const isSitemap = url === "/sitemap.xml";
        res.setHeader("Content-Type", isSitemap ? "application/xml" : "text/plain");
        res.end(isSitemap ? sitemap : robots);
      });
    },
    closeBundle() {
      const { robots, sitemap } = buildSeoFiles(siteUrl);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "robots.txt"), robots);
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
    },
  };
}

export default defineConfig({
  plugins: [react(), seoFilesPlugin()],
});
