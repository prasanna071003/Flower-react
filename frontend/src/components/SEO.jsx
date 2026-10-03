import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export const SITE_NAME = "Noor & Bloom";
export const BRAND_SUFFIX = "Noor & Bloom Flower Boutique";
export const DEFAULT_IMAGE = "/images/banner-1.png";

const envSiteUrl = import.meta.env.VITE_SITE_URL || "";

export function getSiteUrl() {
  const configured = envSiteUrl.replace(/\/+$/, "");
  if (configured) return configured;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

export function absoluteUrl(path) {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${getSiteUrl()}${path.startsWith("/") ? "" : "/"}${path}`;
}

function clamp(text, max = 160) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export default function SEO({
  title = "",
  description = "",
  image = DEFAULT_IMAGE,
  noindex = false,
  type = "website",
  jsonLd = null,
}) {
  const { pathname } = useLocation();
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}${pathname}`;
  const fullTitle = title
    ? title.includes("Noor & Bloom")
      ? title
      : `${title} — ${BRAND_SUFFIX}`
    : BRAND_SUFFIX;
  const imageUrl = absoluteUrl(image);
  const metaDescription = clamp(description);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description ? (
        <meta name="description" content={metaDescription} />
      ) : null}
      <link rel="canonical" href={canonical} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description ? (
        <meta property="og:description" content={metaDescription} />
      ) : null}
      <meta property="og:url" content={canonical} />
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description ? (
        <meta name="twitter:description" content={metaDescription} />
      ) : null}
      {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
