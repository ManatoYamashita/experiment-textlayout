import { Metadata } from 'next';

export const siteMetadata: Metadata = {
    metadataBase: new URL('https://text-layout.manapuraza.com'),
    title: "文章自動レイアウトWebApp",
    description: "日本語または英語のテキストをDNP（大日本印刷）の論文に基づいた方法で再レイアウトするWebAppです。ブラウザ上で動作するウェブアプリです。東京都市大学の関研究室での卒業研究のために開発",
    icons: {
        icon: 'favicon.ico',
        apple: 'favicon.ico',
    },
    openGraph: {
        title: "文章自動レイアウトWebApp",
        description: "日本語または英語のテキストをDNP（大日本印刷）の論文に基づいた方法で再レイアウトするWebAppです。ブラウザ上で動作するウェブアプリです。東京都市大学の関研究室での卒業研究のために開発",
        url: "https://text-layout.manapuraza.com",
        siteName: '関研究室 - 山下マナト',
        images: [
        {
            url: '/images/ogp.png',
            width: 1200,
            height: 630,
            alt: '文章自動レイアウトWebApp',
        },
        ],
        locale: 'ja_JP',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '文章自動レイアウトWebApp',
        description: "日本語または英語のテキストをDNP（大日本印刷）の論文に基づいた方法で再レイアウトするWebAppです。ブラウザ上で動作するウェブアプリです。東京都市大学の関研究室での卒業研究のために開発",
        site: '@manapuraza',
        images: [
        {
            url: '/images/ogp.png',
            width: 1200,
            height: 630,
            alt: '文章自動レイアウトWebApp',
        },
        ],
    }
};
