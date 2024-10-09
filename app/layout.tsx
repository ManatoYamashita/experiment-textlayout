import { siteMetadata } from "./metadataConfig";
import localFont from "next/font/local";
import Head from "next/head";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const metadata = siteMetadata;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "文章自動レイアウトWebApp",
                "url": "https://text-layout.manapuraza.com",
                "description": "プレーンテキストをDNPの研究に基づき再レイアウトするプログラムです。",
                "applicationCategory": "Productivity",
                "operatingSystem": "All",
                "browserRequirements": "Requires JavaScript and a modern web browser",
                "softwareVersion": "1.0.0",
                "author": {
                  "@type": "Organization",
                  "name": "東京都市大学 メディア情報学部|デザインデータ科学部 関研究室",
                  "url": "https://text-layout.manapuraza.com",
                  "logo": "https://text-layout.manapuraza.com/logo.png",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "03-5707-0104",
                    "contactType": "Customer Support",
                    "availableLanguage": ["English", "Japanese"]
                  }
                },
              }
              
            ),
          }}
        />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main className="main">
          <Header />
          <div className="pageContainer">
            {children}
          </div>
          <Footer
            credit1="先行研究(DNP, 2020)"
            credit2="Github"
            credit3="Docs →"
            credit4="©︎2024 東京都市大学メディア情報学部情報システム学科 関研究室 山下マナト"
            c1url="https://www.dnp.co.jp/news/detail/10158391_1587.html"
            c2url="https://github.com/ManatoYamashita/text-relayout"
            c3url="/about"
            c4url="https://manapuraza.com"
          />
        </main>
      </body>
    </html>
  );
}
