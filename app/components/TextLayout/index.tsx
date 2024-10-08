'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './index.module.scss';
import Loading from '@/components/Loading';

interface TextLayoutProps {
  text: string;
}

const TextLayout: React.FC<TextLayoutProps> = ({ text }) => {
  const [lines, setLines] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchParsedText = async () => {
      setLoading(true);
      const response = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setLines(data.lines);
      setLoading(false);
    };

    fetchParsedText();
  }, [text]);

  useEffect(() => {
    if (paragraphsRef.current.length > 0) {
      paragraphsRef.current.forEach((paragraph, paraIndex) => {
        if (paragraph) {
          // 初期状態で要素を非表示に設定
          gsap.set(paragraph.children, { opacity: 0, y: 20 });

          // 段落ごとのアニメーション（表示 → インデント）
          gsap.timeline({ delay: paraIndex * 0.3 })
            .to(paragraph.children, {   // 表示
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
              stagger: {
                each: 0.1,
                from: 'start',
              },
            })
            .to(paragraph.children, {   // インデント
              marginLeft: (index) => index * 20,
              duration: 1,
              ease: 'power3.out',
            });
        }
      });
    }
  }, [lines]);

  return (
    <div ref={containerRef} className={styles.layoutedParagraph}>
      {loading ? (
        <div className={styles.loadingWrap}>
            <Loading />
        </div>
      ) : (
        lines.map((paragraphLines, paraIndex) => (
          <div key={paraIndex} ref={(el) => { paragraphsRef.current[paraIndex] = el; }}>
            {paragraphLines.length === 1 && paragraphLines[0] === '' ? (
              // 空行の場合は一行分のスペースを追加
              <p className={styles.whiteLine} />
            ) : (
              paragraphLines.map((line, lineIndex) => (
                <p key={lineIndex} className={styles.line}>
                  {line}
                </p>
              ))
            )}
            <br />
          </div>
        ))
      )}
    </div>
  );
};

export default TextLayout;
