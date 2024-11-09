"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './index.module.scss';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import { texts, randomMargins } from '@/data/texts';

interface ButtonsProps {
  currentText: string;
  currentMargin: number;
}

export default function TimerAndAPIPostButton({ currentText, currentMargin }: ButtonsProps) {
  const [hasActionBeenPerformed, setHasActionBeenPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSkipSubmit = useCallback(async (selectedTextFirst5: string, selectedMargin: number) => {
    try {
      console.log(`Sending data: time=SKIP, selectedTextFirst5=${selectedTextFirst5}, randomMargin=${selectedMargin}`);
      const response = await fetch('/api/submitToGoogleSpreadSheet', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time: 'SKIP', selectedTextFirst5, selectedMargin })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error('サーバーエラーが発生しました。または、SKIPされました。');
        setHasActionBeenPerformed(false);
        // alert('SKIPされました。次の試行に移ります。');
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
      setHasActionBeenPerformed(false);
      alert('データの送信中にエラーが発生しました。もう一度お試しください。');
    }
  }, []);

  const handleNavigation = useCallback((selectedPhrase: string, randomMargin: number) => {
    router.push(`/layouted?text=${encodeURIComponent(selectedPhrase)}&margin=${randomMargin}`);
  }, [router]);

  const handleAction = useCallback(async () => {
    if (hasActionBeenPerformed) return;
    setIsLoading(true);

    const selectedMargin = currentMargin;
    const selectedTextFirst5 = currentText.substring(0, 5);

    await handleSkipSubmit(selectedTextFirst5, selectedMargin);

    const randomIndex = Math.floor(Math.random() * texts.length);
    const selectedPhrase = texts[randomIndex];
    const randomMargin = randomMargins[Math.floor(Math.random() * randomMargins.length)];

    setHasActionBeenPerformed(true);

    handleNavigation(selectedPhrase, randomMargin);
    setIsLoading(false);
  }, [hasActionBeenPerformed, handleSkipSubmit, currentText, currentMargin, handleNavigation]);

  useEffect(() => {
    setHasActionBeenPerformed(false);
  }, [pathname]);

  return (
    <div>
      {isLoading ? (
        <Loading /> 
      ) : (
        <Button
          type="submit"
          onClick={handleAction}
          className={styles.btn}
          disabled={hasActionBeenPerformed}
          variant="secondary"
        >
          <strong className={styles.strong}>SKIP&nbsp;</strong>
          &gt;
          <small className={styles.small}>この文章を知っている場合</small>
        </Button>
      )}
    </div>
  );
}
