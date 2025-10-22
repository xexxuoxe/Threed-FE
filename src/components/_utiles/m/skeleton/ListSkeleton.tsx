'use client';

import styles from './ListSkeleton.module.scss';

interface ListSkeletonProps {
  count?: number;
}

export default function ListSkeleton({ count = 5 }: ListSkeletonProps) {
  return (
    <>
      {Array(count).fill(0).map((_, index) => (
        <li key={index} className={styles.skeleton_list_item}>
          <div className={styles.skeleton_image}></div>
          <div className={styles.skeleton_content}>
            <div className={styles.skeleton_title}></div>
            <div className={styles.skeleton_tags}>
              <div className={styles.skeleton_tag}></div>
              <div className={styles.skeleton_tag}></div>
            </div>
            <div className={styles.skeleton_info}>
              <div className={styles.skeleton_avatar}></div>
              <div className={styles.skeleton_user_info}>
                <div className={styles.skeleton_name}></div>
                <div className={styles.skeleton_meta}>
                  <div className={styles.skeleton_meta_item}></div>
                  <div className={styles.skeleton_meta_item}></div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}