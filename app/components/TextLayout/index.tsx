/** @jsxImportSource @emotion/react */
'use client';

import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styles from './index.module.scss';

interface TextLayoutProps {
  text: string;
}

const TextLayout: React.FC<TextLayoutProps> = ({ text }) => {
  const [lines, setLines] = useState<string[][]>([]);

  useEffect(() => {
    const fetchParsedText = async () => {
      const response = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setLines(data.lines);
    };

    fetchParsedText();
  }, [text]);

  return (
    <div className={styles.layoutedParagraph}>
      {lines.map((paragraphLines, paraIndex) => (
        <div key={paraIndex}>
          {paragraphLines.length === 1 && paragraphLines[0] === '' ? (
            // 空行の場合は一行分のスペースを追加
            <p className={styles.whiteLine} />
          ) : (
            paragraphLines.map((line, lineIndex) => (
              <p
                key={lineIndex}
                css={css`
                  margin-left: ${lineIndex * 20}px;
                  margin-bottom: 0;
                `}
              >
                {line}
              </p>
            ))
          )}
          <br />
        </div>
      ))}
    </div>
  );
};

export default TextLayout;
