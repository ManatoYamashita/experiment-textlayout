'use client';

import React, { useState } from 'react';
import TextLayout from '@/components/TextLayout';
import styles from './index.module.scss';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function TextLayoutForm() {
  const [inputText, setInputText] = useState('');
  const [submittedText, setSubmittedText] = useState('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittedText(inputText);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.metaKey && e.key === 'Enter') {
      setSubmittedText(inputText);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="text">文章を入力</label>
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="プレーンテキストを入力し、『Command + Enter』（Ctrl + Enter）でレイアウト適用"
          id="text"
          rows={6}
          cols={60}
          className={styles.textarea}
        />
        <Button className={styles.btn}>適用（Command + Enter）</Button>
      </form>

      {submittedText && <TextLayout text={submittedText} />}
    </div>
  );
}