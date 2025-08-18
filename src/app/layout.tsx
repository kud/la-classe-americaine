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
  title: "La Classe Américaine",
  description: "L'homme le plus classe du monde - Un film culte de Michel Hazanavicius",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${oswald.variable} ${bebasNeue.variable} ${anton.variable} ${fjallaOne.variable} ${playfairDisplay.variable} ${libreBaskerville.variable} font-sans antialiased bg-black text-white relative overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
