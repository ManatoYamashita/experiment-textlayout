import { Metadata } from 'next';

const url: string = "https://text-layout-beta.vercel.app";
const title: string = "文章自動レイアウトWebApp-beta（実験用）";
const description: string = "DNPの研究に基づき日本語のテキストレイアウトを最適化するためのWebアプリケーションであり、被験者実験を通じて読みやすさを向上させることを目的としています。先行研究に基づき、動的なテキストレイアウトとインデント設定を使用して、視線の移動を減少させ、読み速度を向上させることを目指しています。";

export const siteMetadata: Metadata = {
    metadataBase: new URL(url),
    title: title,
    description: description,
    icons: {
        icon: 'favicon.ico',
        apple: 'favicon.ico',
    },
    openGraph: {
        title: title,
        description: description,
        url: url,
        siteName: '東京都市大学 関研究室 - 山下マナト',
        images: [
        {
            url: '/images/ogp.png',
            width: 1200,
            height: 630,
            alt: title,
        },
        ],
        locale: 'ja_JP',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        site: '@manapuraza',
        images: [
        {
            url: '/images/ogp.png',
            width: 1200,
            height: 630,
            alt: title,
        },
        ],
    }
};
