import styles from "./page.module.css";
import StartButton from "./components/StartButton";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>✋Are you ready?</h1>
        <StartButton btnText={"OK! let's go"} />
      </main>
    </div>
  );
}
