import styles from "./page.module.css";
import LayoutButton from "./components/LayoutButton";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>✋Hi there!</h1>
        <LayoutButton text={"Go"} />
      </main>
    </div>
  );
}
