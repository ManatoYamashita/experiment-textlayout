'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import styles from "./page.module.scss";
import Link from "next/link";
import gsap from "gsap";

import HeroImg from "../../public/images/text-layout-system.webp";
import UsageImg from "../../public/images/usage.webp";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // テキスト要素の初期設定
      gsap.set(".animate-text", { opacity: 0, y: 20 });

      // 画像とボタンの初期設定
      gsap.set(".animate-slide", { y: 100 });

      // テキストのアニメーション
      gsap.to(".animate-text", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });

      // 画像とボタンのアニメーション
      gsap.to(".animate-slide", {
        y: 0,
        duration: 1,
        delay: 0.5,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="container mx-auto px-4 py-8 max-w-2xl"
    >
      <h1 className="text-3xl font-bold mb-6 text-center animate-text">
        文章自動レイアウトWebApp
      </h1>
      <h2 className="text-2xl font-bold mb-6 text-center animate-text">仕様について - Readme</h2>
      <div className="mb-6 overflow-y-hidden">
        <Image
          src={HeroImg}
          alt="Hero image"
          width={640}
          height={360}
          className="rounded-lg w-full h-auto object-cover animate-slide"
        />
      </div>

      <div className="space-y-4 mb-8">
        <p className="animate-text">
          このプロジェクトは、文章を自動でレイアウトするWebアプリです。視線移動を最適化し、読みやすさを向上させるために、ステップ状や段階的な行のレイアウトを採用しています。この方法により、読み速度を向上させ、理解度を損なわずにスムーズな読書体験を提供します。
        </p>

        <div className="text-center m-5 overflow-y-hidden">
          <Link className={styles.anchorLink} href="/" aria-label="使ってみる">
            <Button className={`${styles.tryBtn} animate-slide`}>使ってみる</Button>
          </Link>
        </div>

        <h2 className={`${styles.h2} animate-text`}>研究の背景</h2>
        <p className="animate-text">
          このプロジェクトは、電子書籍リーダー向けに日本語のテキストレイアウトを最適化する研究に基づいています。論文によれば、自然な言語単位である「文節」を基準にした改行やテキスト配置を調整することで、視線の無駄な移動を減らし、読み速度を向上させることができます。
        </p>

        <p className="animate-text">
          本プロジェクトにおける主な参考文献：
        </p>
        <ul className={`${styles.unorderList} animate-text`}>
          <li className={styles.list}>
            <Link className={styles.anchorLink} href="https://www.jstage.jst.go.jp/article/isj/59/2/59_219/_article/-char/ja/" aria-label="日本語文章の読み速度向上のためのレイアウトシステムの開発">
              小林潤平, 「<strong>日本語文章の読み速度向上のためのレイアウトシステムの開発</strong>」, 2020
            </Link>
          </li>
          <li className={styles.list}>
            <Link className={styles.anchorLink} href="https://www.dnp.co.jp/news/detail/10158391_1587.html" aria-label="ステップ状と段階的な行レイアウトによる日本語電子テキストリーダーの読み速度向上">
              小林潤平/DNP, 「<strong>ステップ状と段階的な行レイアウトによる日本語電子テキストリーダーの読み速度向上</strong>」, 2020
            </Link>
          </li>
          <li className={styles.list}>
          <Link className={styles.anchorLink} href="https://jglobal.jst.go.jp/detail?JGLOBAL_ID=202002268951264025" aria-label="効率的な読みを支援するための日本語テキストレイアウトの設計">
            小林潤平, 「<strong>効率的な読みを支援するための日本語テキストレイアウトの設計</strong>」, 2020
          </Link>
          </li>
        </ul>

        <h2 className={`${styles.h2} animate-text`}>特徴</h2>
        <ul className={`${styles.unorderList} animate-text`}>
          <li className={styles.list}>
            <strong>自動レイアウト</strong>: ユーザーが入力した日本語の文章を、文節（bunsetsu）ごとに解析し、ステップ状の段階的なレイアウトを適用して表示します。
          </li>
          <li className={styles.list}>
            <strong>読み速度の向上</strong>: 自然な視線の移動を促すため、文節ごとに区切りを設け、インデントを使用して読みやすいレイアウトを提供します。従来のレイアウトに比べて最大1.6倍速く読めることが確認されています。
          </li>
          <li className={styles.list}>
            <strong>レスポンシブデザイン</strong>: デバイスの画面サイズに応じて、レイアウトが自動的に調整され、最適な読書体験を提供します。
          </li>
        </ul>

        <h2 className={`${styles.h2} animate-text`}>使い方</h2>
        <div className="overflow-y-hidden">
          <Image
            src={UsageImg}
            alt="Auto text layout system"
            width={640}
            height={360}
            className="rounded-lg w-full h-auto object-cover animate-slide"
          />
        </div>
        <ol className="animate-text">
          <li className={styles.list}>
            <strong>テキスト入力</strong>: ユーザーが文章をテキストボックスに入力します。
          </li>
          <li className={styles.list}>
            <strong>テキスト処理</strong>: アプリは、形態素解析を使用して文章を文節ごとに分割し、レイアウトの論理を適用します。
          </li>
          <li className={styles.list}>
            <strong>動的レイアウト生成</strong>: JavaScript(形態素解析とレイアウトとアニメーション)とCSS(レイアウト)を使用して、文節ごとに段階的なレイアウトを動的に表示します。
          </li>
          <li className={styles.list}>
            <strong>読書体験</strong>: ユーザーはスムーズに視線を移動（サッカードと停留）し、効率的に文章を読むことができます。
          </li>
        </ol>

        <h2 className={`${styles.h2} animate-text`}>主な使用技術</h2>
        <ul className={`${styles.unorderList} animate-text`}>
          <li className={styles.list}>
            <Link href="https://nextjs.org" aria-label="Next.js" className={styles.anchorLink}>
              <strong>Next.js ver14(Approuter) with TypeScript(JavaScript)</strong>: ブラウザ上で動的にテキストをレイアウトします。
            </Link>
          </li>
          <li className={styles.list}>
            <Link href="https://github.com/takuyaa/kuromoji.js/" aria-label="Kuromoji" className={styles.anchorLink}>
              <strong>Kuromoji(形態素解析)</strong>: 日本語テキストを文節に分解します。
            </Link>
          </li>
          <li className={styles.list}>
            <Link href="https://sass-lang.com" aria-label="Sass" className={styles.anchorLink}>
              <strong>SASS(SCSS)</strong>: 柔軟なテキストのフォーマットとレスポンシブデザインを実現します。
            </Link>
          </li>
          <li className={styles.list}>
            <Link href="https://ui.shadcn.com/" aria-label="shadcn/ui" className={styles.anchorLink}>
              <strong>Shadcn/ui(Radix, tailWindCSS)</strong>: ユーザーインターフェースの構築に使用します。
            </Link>
          </li>
          <li className={styles.list}>
            <Link href="https://eslint.org/" aria-label="ESLint" className={styles.anchorLink}>
              <strong>ESLint & Prettier</strong>: コードの品質を保つために使用します。
            </Link>
          </li>
          <li className={styles.list}>
            <Link href="https://gsap.com" aria-label="Green Sock Animation Library" className={styles.anchorLink}>
              <strong>GSAP</strong>: テキストアニメーションの導入
            </Link>
          </li>
          <li className={styles.list}>
            <Link href="https://vercel.com" aria-label="Vercel" className={styles.anchorLink}>
              <strong>Vercel</strong>: 高速な配信とホスティング
            </Link>
          </li>
        </ul>

        <h2 className={`${styles.h2} animate-text`}>インストール</h2>
        <p className="animate-text">
          ローカルでアプリを実行するには以下のコマンドを順番に実行してください。（
          <Link
            className={styles.anchorLink}
            href="https://www.npmjs.com"
            aria-label="npmの公式サイト"
          >
            npm
          </Link>
          のインストールが必要です。）：
        </p>

        <pre className={`${styles.pre} animate-text overflow-y-hidden`}>
          <code className={styles.code}>
            git clone https://github.com/your-repo/text-layout-app.git
          </code>
        </pre>
        <pre className={`${styles.pre} animate-text overflow-y-hidden`}>
          <code className={styles.code}>cd text-layout-app</code>
        </pre>
        <pre className={`${styles.pre} animate-text overflow-y-hidden`}>
          <code className={styles.code}>npm install</code>
        </pre>
        <pre className={`${styles.pre} animate-text overflow-y-hidden`}>
          <code className={styles.code}>npm run dev</code>
        </pre>

        <p className="animate-text">
          その後、ブラウザで <code className={styles.code}>http://localhost:3000</code> にアクセスしてください。
        </p>

        <h2 className={`${styles.h2} animate-text`}>今後の課題</h2>
        <ul className={`${styles.unorderList} animate-text`}>
          <li className={styles.list}>
            初回のみレイアウトが行われないバグがたまにあります。
          </li>
          <li className={styles.list}>
            スクロールができることをユーザに伝える必要があると思っています。
          </li>
          <li className={styles.list}>
            カスタマイズオプション（フォントサイズやカラースキームなど）の追加。
          </li>
          <li className={styles.list}>
            縦書テキストのレイアウト対応。
          </li>
          <li className={styles.list}>
            ユーザーが自由にレイアウトを調整できる機能の導入。
          </li>
        </ul>

        <h2 className={`${styles.h2} animate-text`}>ライセンス</h2>
        <p className="animate-text">
          このプロジェクトは
          <Link
            className={styles.anchorLink}
            href="https://ja.wikipedia.org/wiki/MIT_License"
            aria-label="MITライセンスとは（Wikipedia.org）"
          >
            MITライセンス
          </Link>
          のもとで提供されています。
        </p>
      </div>

      <div className="text-center overflow-y-hidden">
        <Link className={styles.anchorLink} href="/">
          <Button className={`${styles.tryBtn} animate-slide`}>使ってみる</Button>
        </Link>
      </div>
    </div>
  );
}
