import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const FONTS = join(ROOT, "node_modules/@fontsource");

export const OG_SIZE = { width: 1200, height: 630 };

export async function ogFonts() {
  const [bodoni, bodoniItalic, courier] = await Promise.all([
    readFile(join(FONTS, "bodoni-moda/files/bodoni-moda-latin-500-normal.woff")),
    readFile(join(FONTS, "bodoni-moda/files/bodoni-moda-latin-400-italic.woff")),
    readFile(join(FONTS, "courier-prime/files/courier-prime-latin-400-normal.woff")),
  ]);
  return [
    { name: "Bodoni Moda", data: bodoni, weight: 500 as const, style: "normal" as const },
    { name: "Bodoni Moda", data: bodoniItalic, weight: 400 as const, style: "italic" as const },
    { name: "Courier Prime", data: courier, weight: 400 as const, style: "normal" as const },
  ];
}

/** A still from public/stills as a PNG data URL (satori does not read WebP). */
export async function stillDataUrl(src: string, width: number): Promise<string> {
  const png = await sharp(join(ROOT, "public", src)).resize(width).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

/** The OG frame: the quote in Bodoni Moda on --screen, the still at the right, the wordmark bottom-left. */
export function OgCard({ quote, who, image }: { quote: string; who: string | null; image: string | null }) {
  const size = quote.length > 90 ? 44 : quote.length > 50 ? 56 : 72;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#0e0d0c", color: "#e4ded2" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px 52px 72px" }}>
        <div style={{ display: "flex", fontFamily: "Courier Prime", fontSize: 20, letterSpacing: 4, color: "#9e978a" }}>
          LA CLASSE AMÉRICAINE · 1993
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Bodoni Moda", fontWeight: 500, fontStyle: "normal", fontSize: size, lineHeight: 1.08 }}>{`« ${quote} »`}</div>
          {who && <div style={{ marginTop: 22, fontFamily: "Courier Prime", fontSize: 24, color: "#9e978a" }}>{`— ${who}`}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <div style={{ fontFamily: "Bodoni Moda", fontWeight: 400, fontStyle: "italic", fontSize: 40 }}>Le Flim</div>
          <div style={{ fontFamily: "Courier Prime", fontSize: 16, letterSpacing: 3, color: "#9e978a" }}>HOMMAGE NON OFFICIEL</div>
        </div>
      </div>
      {image && (
        <div style={{ display: "flex", width: 420, height: "100%", padding: "40px 40px 40px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- satori */}
          <img src={image} width={380} height={550} style={{ objectFit: "cover", border: "1px solid #ffffff2e" }} />
        </div>
      )}
    </div>
  );
}
