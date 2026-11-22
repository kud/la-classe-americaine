import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Courier_Prime } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Footer } from "@/components/Footer";
import { BRAND } from "@/content/brand";
import { SITE } from "@/lib/site";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-bodoni",
});

const courier = Courier_Prime({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-courier",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · ${SITE.title}`, template: "%s · La Classe Américaine" },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: `${SITE.name} — La Classe Américaine, hommage`,
    title: "L'homme le plus classe du monde est mort.",
    description: SITE.description,
    images: [{ url: BRAND.ogHome.src, width: 1200, height: 630, alt: "L'homme le plus classe du monde est mort. — Le Flim" }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: BRAND.mark.src, type: "image/svg+xml" },
      { url: BRAND.mark512.src, type: "image/png", sizes: "512x512" },
    ],
    apple: BRAND.mark512.src,
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0d0c",
  colorScheme: "light dark",
};

/**
 * Before first paint on the home page: if the opening card has never been
 * shown in this browser (or storage is unavailable), black the page out so the
 * card arrives as a cut, not after a flash of the newsreel. On every page:
 * mark that motion is allowed, so screens may wait for their entrance.
 */
const CARTON_SCRIPT = `(function(){var d=document.documentElement;try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.dataset.anim="1"}catch(e){}if(location.pathname!=="/")return;try{if(localStorage.getItem("lca-carton")!=="1")d.dataset.carton="1"}catch(e){d.dataset.carton="1"}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bodoni.variable} ${courier.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: CARTON_SCRIPT }} />
      </head>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
