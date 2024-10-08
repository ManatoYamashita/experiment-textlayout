'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function TextLayoutForm() {
  const [inputText, setInputText] = useState('');
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/layouted?text=${encodeURIComponent(inputText)}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.metaKey && e.key === 'Enter') {
      router.push(`/layouted?text=${encodeURIComponent(inputText)}`);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="paragraph" className={styles.label}>文章を入力して送信してください</label>
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
        <Button className={styles.btn}>
            <strong>送信！</strong>
            <small>（Command + Enter）</small>
        </Button>
      </form>
    </>
  );
}