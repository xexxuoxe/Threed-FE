'use client';

// import { useEffect } from 'react';
import usePageData from './hooks/usePosts';
import AllCardcomponent from './components/AllCard';
import styles from './bookAndUser.module.scss';

interface BookAndUserProps {
  type: 'bookmark' | 'mypage';
}

export default function BookAndUserComponent({ type }: BookAndUserProps) {
  const { icon, title } = usePageData(type);

  return (
    <main className={styles.inner}>
      <div className={styles.main_header}>
        <h2>
          <span className={styles[icon]}></span>
          {title}
        </h2>
      </div>

      <AllCardcomponent type={type} />
    </main>
  );
}
