import { NextResponse } from 'next/server';
import kuromoji, { Tokenizer, IpadicFeatures } from 'kuromoji';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const { text } = await request.json();

  try {
    const dicPath = path.join(process.cwd(), 'dictionary');

    const tokenizer: Tokenizer<IpadicFeatures> = await new Promise((resolve, reject) => {
      kuromoji.builder({ dicPath }).build((err, tokenizer) => {
        if (err) {
          reject(err);
        } else {
          resolve(tokenizer);
        }
      });
    });

    // テキストを段落（改行を含む）ごとに分割
    const paragraphs = text.split(/\n/);

    const allLines: string[][] = [];

    paragraphs.forEach((paragraph: string) => {
      if (!paragraph.trim()) {
        // 段落間に空行を挿入
        allLines.push(['']);
        return;
      }

      const tokens = tokenizer.tokenize(paragraph);

      // 文節のリストを作成
      const bunsetsuList: string[] = [];
      let currentBunsetsu = '';

      tokens.forEach((token, index) => {
        const pos = token.pos;
        const posDetail1 = token.pos_detail_1;
        const surface = token.surface_form;

        // 自立語の判定
        const isIndependent = pos === '名詞' || pos === '動詞' || pos === '形容詞' || pos === '副詞' || pos === '連体詞' || pos === '感動詞';

        if (isIndependent) {
          // 現在の文節をリストに追加し、新しい文節を開始
          if (currentBunsetsu !== '') {
            bunsetsuList.push(currentBunsetsu);
          }
          currentBunsetsu = surface;
        } else {
          // 付属語を現在の文節に追加
          currentBunsetsu += surface;
        }

        // 最後のトークンの場合、現在の文節をリストに追加
        if (index === tokens.length - 1 && currentBunsetsu !== '') {
          bunsetsuList.push(currentBunsetsu);
        }
      });

      // 文節間で改行を行い、行幅を調整
      const lines: string[] = [];
      let currentLine = '';
      const minLineWidth = 332.6; // 約20文字分の幅
      const maxLineWidth = 498.9; // 約30文字分の幅
      let currentLineWidth = 0;

      bunsetsuList.forEach((bunsetsu, index) => {
        const bunsetsuWidth = bunsetsu.length * 16.63; // 文字幅を計算

        if (currentLineWidth + bunsetsuWidth > maxLineWidth && currentLine !== '') {
          // 行幅が最大を超える場合、現在の行を確定
          lines.push(currentLine);
          currentLine = bunsetsu;
          currentLineWidth = bunsetsuWidth;
        } else {
          // 文節を現在の行に追加
          currentLine += bunsetsu;
          currentLineWidth += bunsetsuWidth;
        }
      });

      if (currentLine !== '') {
        lines.push(currentLine); // 最後の行を追加
      }

      allLines.push(lines);
    });

    return NextResponse.json({ lines: allLines });
  } catch (err: unknown) {
    console.error(err);

    let errorMessage = 'An unexpected error occurred.';
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
