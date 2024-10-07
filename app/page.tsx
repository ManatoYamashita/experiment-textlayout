import styles from "./page.module.css";
import TextForm from "./components/TextForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TextForm />
      </main>
      <Footer
        credit1="References(DNP, 2020)"
        credit2="Github"
        credit3="Manato Yamashita"
        credit4="©︎2024 東京都市大学メディア情報学部情報システム学科 関研究室 山下マナト"
        c1url="https://www.dnp.co.jp/news/detail/10158391_1587.html"
        c2url="https://github.com/ManatoYamashita/text-relayout"
        c3url="https://manapuraza.com"
        c4url="https://manapuraza.com"
      />
    </div>
  );
}
