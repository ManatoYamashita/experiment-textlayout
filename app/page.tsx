import styles from "./page.module.css";
import TextForm from "./components/TextForm";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>✋Hi there!</h1>
        <TextForm />
      </main>
    </div>
  );
}
