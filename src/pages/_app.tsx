import type { AppProps } from "next/app";
import Head from "next/head";
import { Lilita_One, Merriweather, Poppins } from "next/font/google"; // 1. Import fonts
import "../styles/globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import InactivityWrapper from "../components/InactivityWrapper";

// 2. Configure the fonts matching your previous URL weights
const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
});

const merriweather = Merriweather({
  weight: "400", // Defaulting to 400 as per your URL
  subsets: ["latin"],
  variable: "--font-merriweather",
});

const poppins = Poppins({
  weight: "600", // Your URL specifically asked for weight 600
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <InactivityWrapper>
        {/* 3. Wrap application in main to apply font variables globally */}
        <main className={`${lilita.variable} ${merriweather.variable} ${poppins.variable}`}>
          <Head>
            {/* Removed the Google Fonts link tag to fix the warning */}
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