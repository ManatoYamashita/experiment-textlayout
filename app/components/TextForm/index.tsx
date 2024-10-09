'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import styles from './index.module.scss';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function TextLayoutForm() {
  const [inputText, setInputText] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 初期状態で全要素を非表示に設定
    gsap.set("form", { visibility: "hidden" });
    gsap.set("label", { opacity: 0, x: -500 });
    gsap.set("textarea", { x: -500 });
    gsap.set("button", { y: 100 });

    // タイムラインを作成
    const tl = gsap.timeline({
      defaults: { duration: 0.7, ease: "power3.out" },
    });

    // アニメーションの順序設定
    tl.set("form", { visibility: "visible" })  // フォーム全体を表示
      .to("label", { opacity: 1, x: 0 }, 0)  // ラベルを左からスライドイン
      .to("textarea", { x: 0 }, 0.2)  // テキストエリアを少し遅れて左からスライドイン
      .to("button", { y: 0 }, 0.5);  // ボタンを最後に下からスライドイン
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsButtonClicked(!isButtonClicked);
    router.push(`/layouted?text=${encodeURIComponent(inputText)}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.metaKey && e.key === 'Enter') {
      setIsButtonClicked(!isButtonClicked);
      router.push(`/layouted?text=${encodeURIComponent(inputText)}`);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <label htmlFor="paragraph" className={styles.label}>
          文章を入力して送信してください（長すぎるテキストはエラーを起こす場合があります）
        </label>
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your plain-text here and press Command + Enter(Ctrl + Enter) to submit."
          id="paragraph"
          rows={6}
          cols={60}
          className={styles.textarea}
        />
        <Button
          type="submit"
          className={`${styles.btn} ${isButtonClicked ? styles.btnInverted : ''}`}
        >
          <strong className={styles.strong}>送信！</strong>
          <small className={styles.small}>（Command + Enter）</small>
        </Button>
      </form>
    </>
  );
}
