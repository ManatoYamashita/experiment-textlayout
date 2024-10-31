import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';
import Image from 'next/image';
import logoImage from '../../../public/images/sekilab-logo.webp';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* <Link href="https://www.comm.tcu.ac.jp/seki-ken" className={styles.logo} aria-label='東京都市大学 関研究室 情報セキュリティ'> */}
      <Link href="/" className={styles.logo} aria-label='東京都市大学 関研究室 情報セキュリティ'>
        <Image
            src={logoImage}
            alt='Seki Labo'
            width={100}
            height={42}
            priority
            draggable={false}
            loading='eager'
        />
        <h1 className={styles.subtitle}>
          文章自動レイアウトWebApp - <strong>βeta</strong>
        </h1>
      </Link>
      <nav className={styles.nav}>
        <Link href="/about" className={styles.link}>
            ReadMe<span className={styles.alow}>→</span>
        </Link>
        <Link href="https://text-layout.manapuraza.com" className={styles.link}>
            Stable<span className={styles.alow}>→</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

