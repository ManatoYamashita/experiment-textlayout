import styles from "./page.module.css";
import StartButton from "./components/StartButton";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>📖Are you ready?</h1>
        <p className={styles.para}>これは、実験用です。これから星新一の文章が表示されるのでそれ読んで読み終わったらボタンを押してください。そうしたらまた星新一の別の文章が出てくるので、飽きるまで繰り返してください。
          <br />PCでの使用を推奨します。</p>
        <StartButton btnText={"OK! let's go"} />
      </main>
    </div>
  );
}
