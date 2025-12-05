import type { AppProps } from "next/app";
import Head from "next/head";
import {
  Lilita_One,
  Merriweather,
  Poppins,
  Libertinus_Sans,
  Cinzel,
  Libre_Baskerville,
  PT_Serif,
  Alatsi,
  Alumni_Sans_SC,
} from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import InactivityWrapper from "../components/InactivityWrapper";

// --- Font Configurations ---

// 1. Lilita One (Logo Text)
const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
});

// 2. Merriweather (Nav Links)
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

// 3. Poppins (General Text)
const poppins = Poppins({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-poppins",
});

// 4. Libertinus Sans (Body Text / About Page)
const libertinus = Libertinus_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-libertinus",
  adjustFontFallback: false, // Essential to prevent 500 errors
});

// 5. Cinzel (Headings / Titles)
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

// 6. Libre Baskerville (Member Names)
const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
});

// 7. PT Serif (Headings Alternate)
const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pt-serif",
});

// 8. Alatsi (Product Names)
const alatsi = Alatsi({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alatsi",
});

// 9. Alumni Sans SC (Buttons)
const alumniSansSC = Alumni_Sans_SC({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-alumni-sans-sc",
  adjustFontFallback: false,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <InactivityWrapper>
        {/* Apply ALL font variables to the main tag so they are available globally */}
        <main
          className={`
            ${lilita.variable} 
            ${merriweather.variable} 
            ${poppins.variable} 
            ${libertinus.variable}
            ${cinzel.variable}
            ${libreBaskerville.variable}
            ${ptSerif.variable}
            ${alatsi.variable}
            ${alumniSansSC.variable}
          `}
        >
          <Head>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <meta name="theme-color" content="#032f3c" />
          </Head>
          <Component {...pageProps} />
        </main>
      </InactivityWrapper>
    </AuthProvider>
  );
}