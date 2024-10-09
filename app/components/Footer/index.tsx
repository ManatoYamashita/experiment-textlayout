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
          >
            <Image
              aria-hidden
              src="https://nextjs.org/icons/window.svg"
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
          >
            <Image
              aria-hidden
              src="https://nextjs.org/icons/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
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
          <small>
            {credit4}
          </small>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
