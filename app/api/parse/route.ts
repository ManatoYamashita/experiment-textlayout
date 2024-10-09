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
      const lines: string[] = [];
      let currentLine = '';
      const maxLineWidth = 300; // 単位: px
      const minLineWidth = 250; // 単位: px
      let currentLineWidth = 0;

      tokens.forEach((token, index) => {
        const word = token.surface_form;
        const pos = token.pos; // 品詞情報
        const wordWidth = word.length * 10; // 仮に全角文字1文字あたり10pxと仮定

        // 単語を追加して最大行幅を超えるか確認
        if (currentLineWidth + wordWidth > maxLineWidth && currentLine !== '') {
          // 文節で改行
          if (
            currentLineWidth >= minLineWidth &&
            !['。', '、', '「', '」'].includes(word)
          ) {
            lines.push(currentLine); // 現在の行を確定
            currentLine = word; // 新しい行を開始
            currentLineWidth = wordWidth;
          } else {
            currentLine += word;
            currentLineWidth += wordWidth;
          }
        } else {
          currentLine += word;
          currentLineWidth += wordWidth;
        }

        // 文節の終わり、または助詞・助動詞が続かない場合に改行
        if ((pos !== '助詞' && pos !== '助動詞') || index === tokens.length - 1) {
          if (
            currentLineWidth >= minLineWidth &&
            !['。', '、'].includes(word) &&
            currentLine !== ''
          ) {
            lines.push(currentLine); // 行を確定
            currentLine = '';
            currentLineWidth = 0;
          }
        }
      });

      if (currentLine) {
        lines.push(currentLine); // 最後の行を追加
      }

      allLines.push(lines);
    });

    // JSONレスポンスを返す
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
