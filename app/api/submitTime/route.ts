import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  const { time } = await req.json();

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
  const range = 'Sheet1';

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[new Date().toISOString(), time]],
      },
    });
    return NextResponse.json({ message: 'データが送信されました' }, { status: 200 });
  } catch (error) {
    console.error('スプレッドシートへの書き込みエラー:', error);
    return NextResponse.json({ error: 'データ送信に失敗しました', details: error }, { status: 500 });
  }
}
