import { Metadata } from 'next';

export const siteMetadata: Metadata = {
    metadataBase: new URL('https://text-layout.manapuraza.com'),
    title: "文章自動レイアウトWebApp",
    description: "プレーンテキストをDNPの研究に基づき再レイアウトするWepシステムです。",
    icons: {
        icon: 'icon.png',
        apple: 'icon.png',
    },
    openGraph: {
        title: "文章自動レイアウトWebApp",
        description: "プレーンテキストをDNPの研究に基づき再レイアウトするWebAppです。",
        url: "https://text-relayout.manapuraza.com",
        siteName: '関研究室 - 山下マナト',
        images: [
        {
            url: 'ogp.png',
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
        description: 'プレーンテキストをDNPの研究に基づき再レイアウトするシステムです。',
        images: [
        {
            url: '/_next/ogp.png',
            width: 1200,
            height: 630,
            alt: '文章自動レイアウトWebApp',
        },
        ],
    }
};
