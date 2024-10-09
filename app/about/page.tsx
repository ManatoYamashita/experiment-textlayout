import Image from "next/image"
import { Button } from "@/components/ui/button"
import styles from "./page.module.scss"
import Link from "next/link"

import ogpImage from "@/ogp.png"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">日本語文章自動レイアウトWebアプリ</h1>
      
      <div className="mb-6">
        <Image
          src={ogpImage}
          alt="Profile picture"
          width={640}
          height={360}
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>
      
      <div className="space-y-4 mb-8">
        <p>このプロジェクトは、日本語の文章を自動でレイアウトするWebアプリです。視線移動を最適化し、読みやすさを向上させるために、ステップ状や段階的な行のレイアウトを採用しています。この方法により、読み速度を向上させ、理解度を損なわずにスムーズな読書体験を提供します。</p>

        <h2 className={styles.h2}>特徴</h2>
        <ul>
            <li><strong>自動レイアウト</strong>: ユーザーが入力した日本語の文章を、文節（bunsetsu）ごとに解析し、ステップ状の段階的なレイアウトを適用して表示します。</li>
            <li><strong>読み速度の向上</strong>: 自然な視線の移動を促すため、文節ごとに区切りを設け、インデントを使用して読みやすいレイアウトを提供します。従来のレイアウトに比べて最大1.6倍速く読めることが確認されています。</li>
            <li><strong>レスポンシブデザイン</strong>: デバイスの画面サイズに応じて、レイアウトが自動的に調整され、最適な読書体験を提供します。</li>
        </ul>

        <h2 className={styles.h2}>使い方</h2>
        <ol>
            <li><strong>テキスト入力</strong>: ユーザーが日本語の文章をテキストボックスに入力します。</li>
            <li><strong>テキスト処理</strong>: アプリは、形態素解析を使用して文章を文節ごとに分割し、レイアウトの論理を適用します。</li>
            <li><strong>動的レイアウト生成</strong>: JavaScriptとCSSを使用して、文節ごとに段階的なレイアウトを動的に表示します。</li>
            <li><strong>読書体験</strong>: ユーザーはスムーズに視線を移動し、効率的に文章を読むことができます。</li>
        </ol>

        <h2 className={styles.h2}>使用技術</h2>
        <ul>
            <li><strong>JavaScript</strong>: ブラウザ上で動的にテキストをレイアウトします。</li>
            <li><strong>形態素解析</strong>: 日本語テキストを文節に分解します。</li>
            <li><strong>CSS</strong>: 柔軟なテキストのフォーマットとレスポンシブデザインを実現します。</li>
            <li><strong>GSAP</strong>: （オプション）テキストアニメーションの導入が可能です。</li>
        </ul>

        <h2 className={styles.h2}>研究の背景</h2>
        <p>このプロジェクトは、電子書籍リーダー向けに日本語のテキストレイアウトを最適化する研究に基づいています。研究によれば、自然な言語単位である「文節」を基準にした改行やテキスト配置を調整することで、視線の無駄な移動を減らし、読み速度を向上させることができます。</p>

        <p>本プロジェクトにおける主な参考文献：</p>
        <ul>
            <li>小林潤平「日本語文章の読み速度向上のためのレイアウトシステムの開発」</li>
            <li>小林潤平「ステップ状と段階的な行レイアウトによる日本語電子テキストリーダーの読み速度向上」</li>
            <li>小林潤平「効率的な読みを支援するための日本語テキストレイアウトの設計」</li>
        </ul>

        <h2 className={styles.h2}>インストール</h2>
        <p>ローカルでアプリを実行するには：</p>

        <pre className={styles.pre}><code className={styles.code}>git clone https://github.com/your-repo/text-layout-app.git
        cd text-layout-app
        npm install
        npm run dev</code></pre>

        <p>その後、ブラウザで <code>http://localhost:3000</code> にアクセスしてください。</p>

        <h2 className={styles.h2}>使用方法</h2>
        <ol>
            <li>テキストボックスに日本語の文章を入力します。</li>
            <li>「ステップレイアウトに変換」ボタンを押します。</li>
            <li>自動的に最適化されたレイアウトが表示されます。</li>
        </ol>

        <h2 className={styles.h2}>今後の課題</h2>
        <ul>
            <li>カスタマイズオプション（フォントサイズやカラースキームなど）の追加。</li>
            <li>縦書き日本語テキストのレイアウト対応。</li>
            <li>ユーザーが自由にレイアウトを調整できる機能の導入。</li>
        </ul>

        <h2 className={styles.h2}>ライセンス</h2>
        <p>このプロジェクトはMITライセンスのもとで提供されています。</p>
      </div>
      
      <div className="text-center">
        <Button>
          <Link href="/">
            使ってみる
          </Link>
        </Button>
      </div>
    </div>
  )
}