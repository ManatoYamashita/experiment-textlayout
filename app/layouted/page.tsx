import React from 'react';
import TextLayout from '@/components/TextLayout';
import styles from './page.module.scss';

interface LayoutPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function LayoutPage({ searchParams }: LayoutPageProps) {
  const text = searchParams.text;

  if (!text || typeof text !== 'string') {
    return (
      <div className={styles.layoutContainer}>
        <h1 className={styles.title}>☕️エラー: テキストを入力してください。</h1>
        <div className={styles.error}>No text provided.</div>
      </div>
    );
  }

  return (
    <div className={styles.layoutContainer}>
      <h1 className={styles.title}>✨Looks good?</h1>
      <TextLayout text={text} />
    </div>
  );
}
