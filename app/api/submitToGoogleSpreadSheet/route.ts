import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  const { time, selectedTextFirst5, selectedMargin } = await req.json();

  // 入力データのバリデーション
  if (
    typeof time !== 'number' ||
    typeof selectedTextFirst5 !== 'string' ||
    typeof selectedMargin !== 'number'
  ) {
    return NextResponse.json(
      { message: 'Invalid input data. `time` and `selectedMargin` must be numbers, and `selectedTextFirst5` must be a string.' },
      { status: 400 }
    );
  }

  // 認証情報の設定
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const spreadsheetId = process.env.SPREADSHEET_ID;
  const range = 'Sheet1!A:D'; // A列: Timestamp, B列: Time, C列: SelectedTextFirst5, D列: RandomMargin

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
            time,
            selectedTextFirst5,
            selectedMargin
          ]
        ],
      },
    });
    return NextResponse.json({ message: 'データが送信に成功！' }, { status: 200 });
  } catch (error) {
    console.error('スプレッドシートへの書き込みエラー:', error);
    return NextResponse.json(
      { message: 'データ送信に失敗しました', details: error },
      { status: 500 }
    );
  }
}
