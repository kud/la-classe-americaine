import type { MetadataRoute } from "next";
import { QUOTES } from "@/content/quotes";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/`, priority: 1 },
    { url: `${SITE.url}/repliques`, priority: 0.8 },
    { url: `${SITE.url}/generique`, priority: 0.6 },
    ...QUOTES.map((q) => ({ url: `${SITE.url}/repliques/${q.slug}`, priority: 0.5 })),
  ];
}
