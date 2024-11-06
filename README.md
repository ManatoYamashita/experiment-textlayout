# 文章自動レイアウトWebApp - Beta（実験用）

## 概要

このプロジェクトは、電子書籍リーダー向けに日本語のテキストレイアウトを最適化する研究に基づいています。論文によれば、自然な言語単位である「文節」を基準にした改行やテキスト配置を調整することで、視線の無駄な移動を減らし、読み速度を向上させることができます。

先行研究は日本語文章の読みやすさ向上に向けた新しいレイアウト手法を提案しましたが、その適用範囲や根拠に基づくインデント設定の適切性において改良の余地がある可能性が残されています。
本研究では、これらの限界を踏まえ、適切なインデント量を明らかにするための被験者実験を行い、DNPの研究の補完を目指します。
このWebAppは、その被験者実験用のために開発されたものをBetaと呼んでいます。

本プロジェクトにおける主な参考文献：

- 小林潤平，関口隆，新堀英二，川嶋稔夫，“文節間改行レイアウトを有する日本語リーダーの読み効率評価”，人工知能学会論文誌，vol.30，no.2，pp.479‒484，2015.
- 小林潤平，関口隆，新堀英二，川嶋稔夫，“日本語リーダーにおける読み速度と眼球運動の行長依存性に基づく最適行長の検討”，電子情報通信学会論文誌.D，vol.J99‒D，no.1，pp.23‒34，2016.
- 小林潤平，関口隆，新堀英二，川嶋稔夫，“文節単位を考慮した文字配置の工夫がもたらす日本語電子リーダーの可読性向上”，人工知能学会論文誌，vol.32，no.2，pp.A‒AI30 1‒24，2017.
- J. Kobayashi, E. Shinbori, and T. Kawashima, “Stepped and tiered line text layoutfor improving reading rate in Japanese electronic text readers”, SID Symposium Digest of Technical Papers (SID 2019), pp.410‒413, 2019.
- 小林潤平，“レイアウトデザインによる効率的な読みの支援”，日本画像学会誌，59(2)，219-227，2020.
- 小林潤平，“読みを速くする日本語文章レイアウトシステムの研究開発”，UNISYS TECHNOLOGY REVIEW，第143号，MAR. 2020.

## 特徴

- **BudouX** を使用した日本語文章解析
- 動的なテキストレイアウト
- クエリパラメータを使用したカスタマイズ可能なマージン設定
- **Google APIs**を使用した計測と記録
- レスポンシブデザイン対応

## 使用技術

- **Next.js(Approuter) with TypeScript(JavaScript)**: Node.js上に構築されたオープンソースのWebアプリケーションフレームワーク。Typescriptで記述されています。
- **BudouX(機械学習モデル)**: サードパーティのAPIや分かち書きライブラリに依存せずに動作する、20KB程度で計量な機械学習モデルです。文節間改行のために使用します。
   -- 当初はKuromojiライブラリで形態素解析を行なっていたが、煩雑だったため軽量なBudouXに変更
- **Google APIs**: Googleスプレッドシートにフォームデータを送信するために使用しています。日時、表示されている文章の種類、適用されたインデント量、読了時間を計測し、Googleスプレッドシートに記録します。
- **SASS(SCSS)**: アプリケーション全体のデザインを提供。さらに一部の単純なアニメーションとレスポンシブデザインを実現しています。
- **Shadcn/ui(Radix, tailWindCSS)**: 一貫したデザインのユーザーインターフェースの構築に使用します。
- **GSAP**: フォームの初期表示や、テキストのレイアウト時などの高度なアニメーションを実装するために使用しています。
- **ESLint & Prettier**: コードの品質を保つために使用しています。
- **Vercel**: 高速な配信とホスティング

## インストールとセットアップ

1. リポジトリをクローンします。
    ```bash
    git clone https://github.com/ManatoYamashita/textlayout-beta.git
    ```
2. 依存関係をインストールします。
    ```bash
    cd textlayout-beta
    npm install
    ```
3. 開発サーバーを起動します。
    ```bash
    npm run dev
    ```

## 使い方

1. ブラウザで `http://localhost:3000` にアクセスします。
2. スタートボタンを押下
3. テキストレイアウト(事前に登録されたランダムなインデント量、初回のみインデントは0)が適用された文章(事前に登録されたランダムな星新一のショートショート作品のいずれか)が表示されます。
4. 読了後、APIポストボタンを押下すると、Googleスプレッドシートに記録されます。
5. APIの通信が終了後、自動的に新しい文章が表示されます。
6. これを繰り返すことで、被験者実験を行うことができます。

## 変数について

テキストサイズは、39.3pxとして固定されています。
これは先行研究がiPad、画面解像度は264ppi、フォントサイズ4.4mm(45.7px)であることに基づいており、
等環境であるMacBookAir2020(13.3型, 2,560×1,600ドット、227ppi、16:10)の画面解像度が227ppiであることから、フォントサイズ4.4mmである、39.3pxとしています。

インデントテキスト量は、以下のようにランダムに選択されます。いずれの設定は、`/data/texts.ts` に登録されています。

- インデント量

    -- 20, 30, 39.3, 59, 78.6, 118 の6段階のインデント量がランダムに適用されます。これはテキストを39.3pxとしたときの、それぞれ[1/2, 3/4, 1, 1.5, 2, 3]行分のマージンです。

- 文章の種類

    -- 星新一のショートショート作品「ボッコちゃん」から以下8作品をランダムに選択しています。
        - 『狙われた星』
        - 『盗んだ書類』
        - 『約束』
        - 『デラックスな金庫』
        - 『プレゼント』
        - 『キツツキ計画』
        - 『愛用の時計』
        - 『おみやげ』

## ディレクトリ構成

.
├── README.md
├── app
│   ├── about
│   │   ├── page.module.scss
│   │   └── page.tsx
│   ├── api
│   │   └── submitToGoogleSpreadSheet
│   │       └── route.ts
│   ├── components
│   │   ├── Footer
│   │   │   ├── index.module.scss
│   │   │   └── index.tsx
│   │   ├── Header
│   │   │   ├── index.module.scss
│   │   │   └── index.tsx
│   │   ├── Loading
│   │   │   ├── index.module.scss
│   │   │   └── index.tsx
│   │   ├── StartButton
│   │   │   ├── index.module.scss
│   │   │   └── index.tsx
│   │   ├── TextLayout
│   │   │   ├── index.module.scss
│   │   │   └── index.tsx
│   │   ├── TimerAndAPIPostButton
│   │   │   ├── index.module.scss
│   │   │   └── index.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── form.tsx
│   │       ├── label.tsx
│   │       └── textarea.tsx
│   ├── data
│   │   └── texts.ts
│   ├── favicon.ico
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   ├── GeistVF.woff
│   │   └── hiragino-kaku-gothic-w3.woff
│   ├── globals.css
│   ├── layout.tsx
│   ├── layouted
│   │   ├── page.module.scss
│   │   └── page.tsx
│   ├── lib
│   │   └── utils.ts
│   ├── metadataConfig.ts
│   ├── page.module.css
│   ├── page.tsx
│   └── variables.scss
├── components.json
├── googleApi_authData.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── images
│       ├── ogp.png
│       ├── sekilab-logo.webp
│       ├── text-layout-system.webp
│       └── usage.webp
├── robots.txt
├── sitemap.xml
├── tailwind.config.js
└── tsconfig.json

## ライセンス
MIT License
