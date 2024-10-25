// /app/api/submitTime/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  const { time, selectedIndex } = await req.json();

  // 入力データのバリデーション
  if (typeof time !== 'number' || typeof selectedIndex !== 'number') {
    return NextResponse.json(
      { message: 'Invalid input data. `time` and `selectedIndex` must be numbers.' },
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
  const range = 'Sheet1!A:C'; // A列: Timestamp, B列: Time, C列: SelectedIndex

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
            selectedIndex
          ]
        ],
      },
    });
    return NextResponse.json({ message: 'データが送信されました' }, { status: 200 });
  } catch (error) {
    console.error('スプレッドシートへの書き込みエラー:', error);
    return NextResponse.json(
      { message: 'データ送信に失敗しました', details: error },
      { status: 500 }
    );
  }
}
