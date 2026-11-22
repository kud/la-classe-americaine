/**
 * Placeholders for the commissioned spots and identity (§8). Each one swaps
 * for the illustrator's file at the path in content/brand.ts once `delivered`
 * is true. Until then, a plain line drawing, so the page never shows a hole.
 */
import { BRAND } from "@/content/brand";

/* eslint-disable @next/next/no-img-element -- SVG brand files, served as-is */

export function Cyclimse({ className }: { className?: string }) {
  if (BRAND.spotCyclimse.delivered) return <img src={BRAND.spotCyclimse.src} alt="" className={className} />;
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true" data-placeholder="spot-cyclimse">
      <circle cx="16" cy="40" r="10" />
      <circle cx="48" cy="40" r="10" />
      <path d="M16 40l10-16h14l8 16M26 24l6 16h-16M36 18h6" />
      <path d="M6 58L58 6" strokeWidth="3" />
    </svg>
  );
}

export function Globe({ className }: { className?: string }) {
  if (BRAND.spotGlobe.delivered) return <img src={BRAND.spotGlobe.src} alt="" className={className} />;
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" data-placeholder="spot-globe">
      <circle cx="60" cy="56" r="40" />
      <ellipse cx="60" cy="56" rx="16" ry="40" />
      <path d="M20 56h80M26 36h68M26 76h68" />
      <path d="M44 104l16-8 16 8-16 8z M44 104l16 8M76 104l-16 8" fill="currentColor" />
    </svg>
  );
}

/** The newsreel ident for chapter 1's title card. */
export function Ident() {
  if (BRAND.ident.delivered) return <img src={BRAND.ident.src} alt="" width={28} height={28} />;
  return <span aria-hidden="true" data-placeholder="ident" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--stamp)", display: "inline-block" }} />;
}

/** « Le Flim », with « La Classe Américaine · hommage ». */
export function Wordmark({ className }: { className?: string }) {
  if (BRAND.wordmark.delivered) return <img src={BRAND.wordmark.src} alt="Le Flim — La Classe Américaine, hommage" className={className} />;
  return (
    <span className={className} data-placeholder="wordmark" style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1 }}>
      <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.6em", letterSpacing: "-0.01em" }}>Le Flim</span>
      <span style={{ fontFamily: "var(--mono)", fontSize: "0.62em", letterSpacing: "0.16em", textTransform: "uppercase", marginTop: "0.45em" }}>
        La Classe Américaine · hommage
      </span>
    </span>
  );
}
