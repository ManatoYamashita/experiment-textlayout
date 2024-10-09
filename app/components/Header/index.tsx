import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';
import Image from 'next/image';
import logo from '../../../public/images/sekilab-logo.webp';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* <Link href="https://www.comm.tcu.ac.jp/seki-ken" className={styles.logo} aria-label='東京都市大学 関研究室 情報セキュリティ'> */}
      <Link href="https://manapuraza.com" className={styles.logo} aria-label='東京都市大学 関研究室 情報セキュリティ'>
        <Image
            src={logo}
            alt='Seki Labo'
            width={125}
            priority
        />
      </Link>
      <nav className={styles.nav}>
        <Link href="/about" className={styles.link}>
            Docs<span className={styles.alow}>→</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

