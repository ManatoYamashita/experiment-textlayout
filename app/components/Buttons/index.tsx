"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import { Button } from '@/components/ui/button';

export default function Buttons() {
  const [time, setTime] = useState(0);
  const router = useRouter();

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

  // 時間を送信する関数
  const handleSubmit = useCallback(async () => {
    try {
      const response = await fetch('/api/submitTime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time })
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
  }, [time]);

  // ページ遷移の関数
  const handleNavigation = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    const selectedPhrase = texts[randomIndex];
    router.push(`/layouted?text=${encodeURIComponent(selectedPhrase)}`);
  }, [texts, router]);

  // 全体の処理をまとめた関数
  const handleAction = useCallback(async () => {
    // 1. 時間を送信
    await handleSubmit();

    // 2. タイマーをリセット
    setTime(-2);

    // 3. ページ遷移
    handleNavigation();
  }, [handleSubmit, handleNavigation]);

  // MetaKey + Enter で動作するイベントリスナー
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        // 全体の処理を実行
        await handleAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // クリーンアップ
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAction]);

  return (
    <div>
      <h1>タイマー: {time} 秒</h1>
      <Button
        type="button"
        onClick={handleAction}
        className={styles.btn}
      >
        <strong className={styles.strong}>Next</strong>
        <small className={styles.small}>（Command + Enter）</small>
      </Button>
    </div>
  );
}
