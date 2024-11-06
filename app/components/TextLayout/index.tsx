"use client";

import React, { useEffect, useState, useRef } from 'react';
import styles from './index.module.scss';
import dynamic from 'next/dynamic';
import { loadDefaultJapaneseParser } from 'budoux';
import { useSearchParams } from 'next/navigation';
import TimerAndAPIPostButton from '@/components/TimerAndAPIPostButton';

const Loading = dynamic(() => import('@/components/Loading'), { ssr: false });

interface TextLayoutProps {
  text: string;
  devicePpi: number;
}

const TextLayout: React.FC<TextLayoutProps> = ({ text, devicePpi }) => {
  const [parsedParagraphs, setParsedParagraphs] = useState<(string[] | 'LINE_BREAK')[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<(HTMLDivElement | null)[]>([]);
  const searchParams = useSearchParams();

  // クエリパラメータから margin を取得
  const marginParam = searchParams.get('margin');
  const randomMargin = marginParam ? parseFloat(marginParam) : 0;

  // 端末(ppi)の4.4mmあたりのピクセル数、つまり、1文字の大きさを計算
  const mmToPx = (4.4 / 25.4) * devicePpi; // 4.4 mm のピクセル換算

  useEffect(() => {
    const parseText = async () => {
      setLoading(true);

      // BudouXの日本語パーサーをロード
      const parser = loadDefaultJapaneseParser();

      // テキストを段落ごとに分割（\nを保持）
      const paragraphs = text.split(/\n/);

      const allParsed: (string[] | 'LINE_BREAK')[] = [];

      paragraphs.forEach((paragraph, index) => {
        if (!paragraph.trim()) {
          // 段落間の改行を保持
          allParsed.push('LINE_BREAK');
          return;
        }

        // 各段落に対してBudouXを適用
        const chunks = parser.parse(paragraph);

        // 文節ごとに分割
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

        allParsed.push(lines);

        // 最後の段落でなければ改行を追加
        if (index < paragraphs.length - 1) {
          allParsed.push('LINE_BREAK');
        }
      });

      setParsedParagraphs(allParsed);
      setLoading(false);
    };

    parseText();
  }, [text]);

  useEffect(() => {
    if (paragraphsRef.current.length > 0) {
      (async () => {
        const { gsap } = await import('gsap');

        paragraphsRef.current.forEach((paragraph, paraIndex) => {
          if (paragraph && Array.isArray(parsedParagraphs[paraIndex])) {
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
                marginLeft: (index: number) => index * (randomMargin * mmToPx), // `randomMargin` を適用
                duration: 1,
                ease: 'power3.out',
              });
          }
        });
      })();
    }
  }, [parsedParagraphs, randomMargin, mmToPx]);

  return (
    <div className={styles.layoutContainer}>
      <div ref={containerRef} className={styles.layoutedParagraph}>
        {loading ? (
          <div className={styles.loadingWrap}>
            <Loading />
          </div>
        ) : (
          parsedParagraphs.map((paragraphLines, paraIndex) => {
            if (paragraphLines === 'LINE_BREAK') {
              // 改行を挿入
              return <br key={`br-${paraIndex}`} />;
            }

            // 最初の段落をタイトルとして扱う場合
            const isTitle = paraIndex === 0;

            return (
              <div
                key={`para-${paraIndex}`}
                ref={(el) => {
                  paragraphsRef.current[paraIndex] = el;
                }}
                className={isTitle ? styles.titleParagraph : styles.normalParagraph}
              >
                {paragraphLines.map((line, lineIndex) => (
                  <p key={lineIndex} className={styles.line}>
                    {line}
                  </p>
                ))}
              </div>
            );
          })
        )}
      </div>
      <div className="text-center">
        <TimerAndAPIPostButton currentText={text} currentMargin={randomMargin} />
      </div>
    </div>
  );
};

export default TextLayout;
