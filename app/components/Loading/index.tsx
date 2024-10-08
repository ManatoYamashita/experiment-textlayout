import React from 'react';
import styles from './index.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
        <div className={styles.loader}>
        <div className={`${styles['loader-inner']} ${styles['square-spin']}`}>
            <div></div>
        </div>
        </div>
        <p>Now loading（読み込み中...）</p>
    </div>
  );
};

export default Loading;