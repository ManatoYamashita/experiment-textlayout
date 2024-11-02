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
  const [time, setTime] = useState(0);
  const [hasActionBeenPerformed, setHasActionBeenPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = useCallback(async (time: number, selectedTextFirst5: string, selectedMargin: number) => {
    try {
      console.log(`Sending data: time=${time}, selectedTextFirst5=${selectedTextFirst5}, randomMargin=${selectedMargin}`);
      const response = await fetch('/api/submitToGoogleSpreadSheet', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time, selectedTextFirst5, selectedMargin })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error('サーバーエラーが発生しました');
        setHasActionBeenPerformed(false);
        alert('データの送信に失敗しました。もう一度お試しください。');
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

    await handleSubmit(time, selectedTextFirst5, selectedMargin);

    const randomIndex = Math.floor(Math.random() * texts.length);
    const selectedPhrase = texts[randomIndex];
    const randomMargin = randomMargins[Math.floor(Math.random() * randomMargins.length)];

    setTime(0);
    setHasActionBeenPerformed(true);

    handleNavigation(selectedPhrase, randomMargin);
    setIsLoading(false);
  }, [hasActionBeenPerformed, handleSubmit, time, currentText, currentMargin, handleNavigation]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        await handleAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAction]);

  useEffect(() => {
    setHasActionBeenPerformed(false);
  }, [pathname]);

  useEffect(() => {
    if (time === 0) {
      setHasActionBeenPerformed(false);
    }
  }, [time]);

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
        >
          <strong className={styles.strong}>Next</strong>
          <small className={styles.small}>（Command + Enter）: ({time})</small>
        </Button>
      )}
    </div>
  );
}
