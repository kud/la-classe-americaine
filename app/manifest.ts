import type { MetadataRoute } from "next";
import { BRAND } from "@/content/brand";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — La Classe Américaine`,
    short_name: SITE.name,
    description: SITE.description,
    lang: "fr",
    start_url: "/",
    display: "standalone",
    background_color: "#0e0d0c",
    theme_color: "#0e0d0c",
    icons: [
      { src: BRAND.mark.src, type: "image/svg+xml", sizes: "any" },
      { src: BRAND.mark512.src, type: "image/png", sizes: "512x512" },
      { src: BRAND.markMaskable.src, type: "image/png", sizes: "512x512", purpose: "maskable" },
    ],
  };
}
