"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './index.module.scss';
import { Button } from '@/components/ui/button';

export default function Buttons() {
  const [time, setTime] = useState(0);
  const [hasActionBeenPerformed, setHasActionBeenPerformed] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // 現在のパスを取得

  const texts = useMemo(
    () => [
      "このプロジェクトは、電子書籍リーダー向けに日本語のテキストレイアウトを最適化する研究に基づいています。論文によれば、自然な言語単位である「文節」を基準にした改行やテキスト配置を調整することで、視線の無駄な移動を減らし、読み速度を向上させることができます。",
      "このプロジェクトは、文章を自動でレイアウトするWebアプリです。視線移動を最適化し、読みやすさを向上させるために、ステップ状や段階的な行のレイアウトを採用しています。この方法により、読み速度を向上させ、理解度を損なわずにスムーズな読書体験を提供します。",
      "The React Framework for the Web. Used by some of the world's largest companies, Next.js enables you to create high-quality web applications with the power of React components.",
      "2024年度国家公務員経験者採用試験（係長級（事務））の最終合格者を対象に官庁訪問（採用面接）を実施します。官庁訪問は、希望省庁から内定を得るためのプロセスとなりますので、デジタル庁を志望される方は必ず参加してください。"
    ],
    []
  );

  // タイマーを起動
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval); // クリーンアップ
  }, []);

  // 時間と選択されたインデックスを送信する関数
  const handleSubmit = useCallback(async (time: number, selectedIndex: number) => {
    try {
      console.log(`Sending data: time=${time}, selectedIndex=${selectedIndex}`);
      const response = await fetch('/api/submitTime', { // 既存のAPIエンドポイントを使用
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time, selectedIndex })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error('サーバーエラーが発生しました');
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  }, []);

  // ページ遷移の関数
  const handleNavigation = useCallback((selectedPhrase: string) => {
    router.push(`/layouted?text=${encodeURIComponent(selectedPhrase)}`);
  }, [router]);

  // 全体の処理をまとめた関数
  const handleAction = useCallback(async () => {
    if (hasActionBeenPerformed) return; // 二度押し防止

    setHasActionBeenPerformed(true); // アクションが実行されたことを記録

    // 1. ランダムなインデックスを選択
    const randomIndex = Math.floor(Math.random() * texts.length);
    const selectedPhrase = texts[randomIndex];

    // 2. 時間と選択されたインデックスを送信
    await handleSubmit(time, randomIndex);

    // 3. タイマーをリセット
    setTime(0);

    // 4. ページ遷移
    handleNavigation(selectedPhrase);
  }, [hasActionBeenPerformed, handleSubmit, time, texts, handleNavigation]);

  // MetaKey + Enter で動作するイベントリスナー
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        await handleAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // クリーンアップ
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAction]);

  // パスが変更されたら状態をリセット
  useEffect(() => {
    setHasActionBeenPerformed(false);
  }, [pathname]);

  // timeが0になったらボタンを再度押せるようにする
  useEffect(() => {
    if (time === 0) {
      setHasActionBeenPerformed(false);
    }
  }, [time]);

  return (
    <div>
      <h1>タイマー: {time} 秒</h1>
      <Button
        type="button"
        onClick={handleAction}
        className={styles.btn}
        disabled={hasActionBeenPerformed} // ボタンを無効化
      >
        <strong className={styles.strong}>Next</strong>
        <small className={styles.small}>（Command + Enter）</small>
      </Button>
    </div>
  );
}
