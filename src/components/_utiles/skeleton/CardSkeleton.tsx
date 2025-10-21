'use client';

import styles from './CardSkeleton.module.scss';

interface CardSkeletonProps {
  count?: number;
}

export default function CardSkeleton({ count = 5 }: CardSkeletonProps) {
  return (
    <>
      {Array(count).fill(0).map((_, index) => (
        <li key={index} className={styles.skeleton_card}>
          <div className={styles.skeleton_image}></div>
          <div className={styles.skeleton_content}>
            <div className={styles.skeleton_title}></div>
            <div className={styles.skeleton_tags}>
              <div className={styles.skeleton_tag}></div>
              <div className={styles.skeleton_tag}></div>
              <div className={styles.skeleton_tag}></div>
            </div>
            <div className={styles.skeleton_info}>
              <div className={styles.skeleton_avatar}></div>
              <div className={styles.skeleton_text}></div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}