import { Metadata } from 'next';

export const siteMetadata: Metadata = {
    metadataBase: new URL('https://text-layout.manapuraza.com'),
    title: "日本語テキスト自動レイアウトシステム",
    description: "プレーンテキストをDNPの研究に基づき再レイアウトするプログラムです。",
    icons: {
        icon: 'icon.png',
        apple: 'icon.png',
    },
    openGraph: {
        title: "日本語テキスト自動レイアウトシステム",
        description: "プレーンテキストをDNPの研究に基づき再レイアウトするプログラムです。",
        url: "https://text-relayout.manapuraza.com",
        siteName: '関研究室 - 山下マナト',
        images: [
        {
            url: '/ogp.png',
            width: 1200,
            height: 630,
            alt: '日本語テキスト自動レイアウトシステム',
        },
        ],
        locale: 'ja_JP',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '日本語テキスト自動レイアウトシステム',
        description: 'プレーンテキストをDNPの研究に基づき再レイアウトするプログラムです。',
        images: [
        {
            url: '/ogp.png',
            width: 1200,
            height: 630,
            alt: '日本語テキスト自動レイアウトシステム',
        },
        ],
    }
};
