'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import { Button } from '@/components/ui/button';

interface LayoutButtonProps {
  text: string;
}

export default function LayoutButton({ text }: LayoutButtonProps) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const router = useRouter();

  const texts = useMemo(() =>  [
    "このプロジェクトは、電子書籍リーダー向けに日本語のテキストレイアウトを最適化する研究に基づいています。論文によれば、自然な言語単位である「文節」を基準にした改行やテキスト配置を調整することで、視線の無駄な移動を減らし、読み速度を向上させることができます。!",
    "このプロジェクトは、文章を自動でレイアウトするWebアプリです。視線移動を最適化し、読みやすさを向上させるために、ステップ状や段階的な行のレイアウトを採用しています。この方法により、読み速度を向上させ、理解度を損なわずにスムーズな読書体験を提供します。",
    "The React Framework for the Web. Used by some of the world's largest companies, Next.js enables you to create high-quality web applications with the power of React components.",
    "2024年度国家公務員経験者採用試験（係長級（事務））の最終合格者を対象に官庁訪問（採用面接）を実施します。官庁訪問は、希望省庁から内定を得るためのプロセスとなりますので、デジタル庁を志望される方は必ず参加してください。"
  ], []);

  // ボタンをクリックする処理をuseCallbackでメモ化
  const handleClick = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    const selectedPhrase = texts[randomIndex];
    setIsButtonClicked(prevState => !prevState);
    router.push(`/layouted?text=${encodeURIComponent(selectedPhrase)}`);
  }, [texts, router]);

  // MetaKey + Enter でボタンを発火させる
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        handleClick();
      }
    };

    // キー押下イベントを追加
    window.addEventListener('keydown', handleKeyDown);

    // クリーンアップ処理（コンポーネントがアンマウントされたときにイベントリスナーを削除）
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClick]); // useEffectにhandleClickを依存させる

  return (
    <Button
      type="submit"
      onClick={handleClick}
      className={`${styles.btn} ${isButtonClicked ? styles.btnInverted : ''}`}
    >
      <strong className={styles.strong}>{ text }</strong>
      <small className={styles.small}>（Command + Enter）</small>
    </Button>
  );
}
