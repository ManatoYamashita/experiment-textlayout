"use client";

import React, { useEffect, useState, useRef } from 'react';
import styles from './index.module.scss';
import dynamic from 'next/dynamic';
import { loadDefaultJapaneseParser } from 'budoux';

const Loading = dynamic(() => import('@/components/Loading'), { ssr: false });

interface TextLayoutProps {
  text: string;
}

const TextLayout: React.FC<TextLayoutProps> = ({ text }) => {
  const [lines, setLines] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const parseText = async () => {
      setLoading(true);

      // BudouXの日本語パーサーをロード
      const parser = loadDefaultJapaneseParser();

      // テキストを段落ごとに分割
      const paragraphs = text.split(/\n/);

      const allLines: string[][] = [];

      paragraphs.forEach((paragraph) => {
        if (!paragraph.trim()) {
          // 段落間に空行を挿入
          allLines.push(['']);
          return;
        }

        // BudouXで文節に分割
        const chunks = parser.parse(paragraph);

        // 文節間で改行を挿入
        const lines: string[] = [];
        let currentLine = '';
        const maxLineWidth = 30; // 最大行文字数

        chunks.forEach((chunk) => {
          if (currentLine.length + chunk.length > maxLineWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = chunk;
          } else {
            currentLine += chunk;
          }
        });

        if (currentLine !== '') {
          lines.push(currentLine);
        }

        allLines.push(lines);
      });

      setLines(allLines);
      setLoading(false);
    };

    parseText();
  }, [text]);

  useEffect(() => {
    if (paragraphsRef.current.length > 0) {
      (async () => {
        const { gsap } = await import('gsap');

        paragraphsRef.current.forEach((paragraph, paraIndex) => {
          if (paragraph) {
            // 初期状態で要素を非表示に設定
            gsap.set(paragraph.children, { opacity: 0, y: 20 });

            // アニメーションの設定
            gsap
              .timeline({ delay: paraIndex * 0.3 })
              .to(paragraph.children, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out',
                stagger: {
                  each: 0.1,
                  from: 'start',
                },
              })
              .to(paragraph.children, {
                marginLeft: (index) => index * 20,
                duration: 1,
                ease: 'power3.out',
              });
          }
        });
      })();
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
          <div
            key={paraIndex}
            ref={(el) => {
              paragraphsRef.current[paraIndex] = el;
            }}
          >
            {paragraphLines.length === 1 && paragraphLines[0] === '' ? (
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
