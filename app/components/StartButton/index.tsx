"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import { Button } from '@/components/ui/button';
import { texts } from '@/data/texts';
import { Loader2 } from "lucide-react"


interface StartButtonProps {
  btnText: string;
}
export default function StartButton({ btnText }: StartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ボタンをクリックする処理をuseCallbackでメモ化
  const handleAction = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    const selectedPhrase = texts[randomIndex];
    setIsLoading(true);
    router.push(`/layouted?text=${encodeURIComponent(selectedPhrase)}&margin=0`);
  }, [router]);

  // MetaKey + Enter でボタンを発火させる
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter' && !isLoading) {
        handleAction();
      }
    };

    // キー押下イベントを追加
    window.addEventListener('keydown', handleKeyDown);

    // クリーンアップ処理（コンポーネントがアンマウントされたときにイベントリスナーを削除）
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAction, isLoading]);

  return (
    <Button
      type="submit"
      onClick={handleAction}
      className={`${styles.btn} ${isLoading ? styles.loading : ''}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className={`animate-spin ${styles.loadingText}`} />
        </>
      ) : (
        <>
          <strong className={styles.strong}>{btnText}</strong>
          <small className={styles.small}>（Command + Enter）</small>
        </>
      )}
    </Button>
  );
}
