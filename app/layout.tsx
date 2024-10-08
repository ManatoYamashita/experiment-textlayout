import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

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

export const metadata: Metadata = {
  title: "文章自動レイアウトシステム",
  description: "プレーンテキストをDNPの研究にもと付いてさいレイアウトするプログラムです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main className="main">
          <Header />
          {children}
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
