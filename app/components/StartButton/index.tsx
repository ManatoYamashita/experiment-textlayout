"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import { Button } from '@/components/ui/button';
import { texts } from '@/data/texts';

interface StartButtonProps {
  btnText: string;
}
export default function StartButton({ btnText }: StartButtonProps) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const router = useRouter();

  // ボタンをクリックする処理をuseCallbackでメモ化
  const handleAction = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    const selectedPhrase = texts[randomIndex];
    setIsButtonClicked(prevState => !prevState);
    router.push(`/layouted?text=${encodeURIComponent(selectedPhrase)}&margin=0`);
  }, [router]);

  // MetaKey + Enter でボタンを発火させる
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        handleAction();
      }
    };

    // キー押下イベントを追加
    window.addEventListener('keydown', handleKeyDown);

    // クリーンアップ処理（コンポーネントがアンマウントされたときにイベントリスナーを削除）
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAction]);

  return (
    <Button
      type="submit"
      onClick={handleAction}
      className={`${styles.btn} ${isButtonClicked ? styles.btnInverted : ''}`}
    >
      <strong className={styles.strong}>{ btnText }</strong>
      <small className={styles.small}>（Command + Enter）</small>
    </Button>
  );
}
