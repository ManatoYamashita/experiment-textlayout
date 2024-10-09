'use client';

import React from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TextLayout from '@/components/TextLayout';
import styles from './page.module.scss';
import Loading from '@/components/Loading';

// プリレンダリングを無効化
export const dynamic = 'force-dynamic';

export default function LayoutPage() {
  const searchParams = useSearchParams();
  const text = searchParams.get('text');

  if (!text) {
    return (
      <div className={styles.layoutContainer}>
        <h1 className={styles.title}>☕️エラー: テキストを入力してください。</h1>
        <div className={styles.error}>No text provided.</div>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className={styles.layoutContainer}>
        <h1 className={styles.title}>✨Looks good?</h1>
        <TextLayout text={text} />
      </div>
    </Suspense>
  );
}
