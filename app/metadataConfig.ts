import { Metadata } from 'next';

export const siteMetadata: Metadata = {
    metadataBase: new URL('https://text-layout.manapuraza.com'),
    title: "文章自動レイアウトWebApp",
    description: "プレーンテキストをDNPの論文に基づいた方法で再レイアウトするWebAppです。",
    icons: {
        icon: 'favicon.ico',
        apple: 'favicon.ico',
    },
    openGraph: {
        title: "文章自動レイアウトWebApp",
        description: "プレーンテキストをDNPの論文に基づいた方法で再レイアウトするWebAppです。",
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
        description: 'Plain-textをDNPの論文に基づいた方法で再レイアウトするWebAppです。',
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
