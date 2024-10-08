import { NextResponse } from 'next/server';
import kuromoji from 'kuromoji';
import path from 'path';

export async function POST(request: Request) {
  const { text } = await request.json();

  return new Promise((resolve, reject) => {
    kuromoji
      .builder({ dicPath: path.join(process.cwd(), 'node_modules/kuromoji/dict') })
      .build((err, tokenizer) => {
        if (err) {
          console.error(err);
          reject(NextResponse.json({ error: err.message }, { status: 500 }));
          return;
        }

        // 段落ごとにテキストを分割（改行を含む）
        const paragraphs = text.split(/\n/);

        const allLines: string[][] = [];

        paragraphs.forEach((paragraph: string) => {
          if (!paragraph.trim()) {
            // 空行（段落の間に空行を挿入）
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

            // 現在の行に追加しても制限を超えないか確認
            if (currentLineWidth + wordWidth > maxLineWidth && currentLine !== '') {
              // 文節で改行する
              if (currentLineWidth >= minLineWidth && !['。', '、', '「', '」'].includes(word)) {
                lines.push(currentLine); // 現在の行を確定
                currentLine = word; // 新しい行に単語を追加
                currentLineWidth = wordWidth;
              } else {
                currentLine += word;
                currentLineWidth += wordWidth;
              }
            } else {
              currentLine += word;
              currentLineWidth += wordWidth;
            }

            // 文節の終わりか、または助詞・助動詞が続かない場合に改行を行う
            if ((pos !== '助詞' && pos !== '助動詞') || index === tokens.length - 1) {
              // 句点や読点で行を開始しないようにする
              if (currentLineWidth >= minLineWidth && !['。', '、'].includes(word) && currentLine !== '') {
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

        // レスポンスとして JSON を返す
        resolve(NextResponse.json({ lines: allLines }));
      });
  }).then(response => response as Response); // 必ず Response 型を返すようにキャスト
}
