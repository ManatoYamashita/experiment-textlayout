import styles from './index.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
    credit1: string;
    credit2: string;
    credit3: string;
    credit4: string;
    c1url: string;
    c2url: string;
    c3url: string;
    c4url: string;
}

function Footer( {credit1, credit2, credit3, credit4, c1url, c2url, c3url, c4url}: FooterProps ) {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link
            href={c1url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label='先行研究'
          >
            <Image
              aria-hidden
              src="https://nextjs.org/icons/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
              {credit1}
          </Link>
          <Link
            href={c2url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label='Github'
          >
            <Image
              aria-hidden
              // src="https://nextjs.org/icons/window.svg"
              src="https://nextjs.org/icons/globe.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
              {credit2}
          </Link>
          <Link
            href={c3url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.docs}
            aria-label='卒業研究のメモ（Notion Site）'
          >
            <Image
              aria-hidden
              src="/icon.ico"
              alt="Globe icon"
              width={18}
              height={18}
            />
              {credit3}
          </Link>
      </div>

      <div className={styles.credit}>
        <Link
          href={c4url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label='東京都市大学'
        >
          <p className={styles.copyr}>
            {credit4}
          </p>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
