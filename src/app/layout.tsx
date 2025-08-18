import type { Metadata } from "next";
import { 
  Oswald,
  Bebas_Neue, 
  Anton,
  Fjalla_One,
  Playfair_Display,
  Libre_Baskerville
} from "next/font/google";
import "./globals.css";
import KeyboardNavigationProvider from "@/components/KeyboardNavigationProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollManager from "@/components/ScrollManager";

// Classic newspaper headline font
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"]
});

// Bold newspaper title font
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400"
});

// Heavy impact headlines
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400"
});

// Strong condensed headlines
const fjallaOne = Fjalla_One({
  subsets: ["latin"],
  variable: "--font-fjalla",
  weight: "400"
});

// Elegant newspaper display font
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"]
});

// Traditional newspaper body text
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL('https://laclasseamericaine.fr'),
  title: "La Classe Américaine - L'homme le plus classe du monde",
  description: "Découvrez La Classe Américaine, le chef-d'œuvre méconnu de Michel Hazanavicius avec les vrais doubleurs français des stars hollywoodiennes. Un film culte qui mélange humour et cinéma d'auteur.",
  keywords: ["La Classe Américaine", "Michel Hazanavicius", "film français", "comédie", "doublage", "cinéma", "George Abitbol", "Monde de merde"],
  authors: [{ name: "Michel Hazanavicius" }, { name: "Dominique Mézerette" }],
  creator: "Michel Hazanavicius",
  publisher: "La Classe Américaine",
  openGraph: {
    title: "La Classe Américaine - L'homme le plus classe du monde",
    description: "Le chef-d'œuvre méconnu de Michel Hazanavicius. Découvrez l'histoire de George Abitbol, l'homme le plus classe du monde.",
    url: "https://laclasseamericaine.fr",
    siteName: "La Classe Américaine",
    images: [
      {
        url: "/george_big.jpg",
        width: 1200,
        height: 630,
        alt: "La Classe Américaine - George Abitbol",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Classe Américaine - L'homme le plus classe du monde",
    description: "Le chef-d'œuvre méconnu de Michel Hazanavicius",
    images: ["/george_big.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "entertainment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${oswald.variable} ${bebasNeue.variable} ${anton.variable} ${fjallaOne.variable} ${playfairDisplay.variable} ${libreBaskerville.variable} font-sans antialiased bg-black text-white relative`}
        style={{ overflowX: 'hidden', maxWidth: '100vw', width: '100%' }}
      >
        {/* Skip to main content for keyboard navigation */}
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        
        {/* Scroll management */}
        <ScrollManager />
        
        {/* Main application */}
        <KeyboardNavigationProvider>
          <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden">
            <Navigation />
            <main className="flex-1 w-full max-w-full overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </div>
        </KeyboardNavigationProvider>
      </body>
    </html>
  );
}
