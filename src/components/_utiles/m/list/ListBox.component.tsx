'use client';

import styles from './ListBox.module.scss';
import Image from 'next/image';
import Link from "next/link";

interface CardBoxProps {
  url: string;
  imageSrc: string;
  isNew?: boolean;
  isHot?: boolean;
  title: string;
  languages: string[] | string;
  writer: string;
  writerImg: string;
  views: number;
  date: string;
}

export default function CardBox({
  url,
  imageSrc,
  isNew = false,
  isHot = false,
  title,
  languages,
  writer,
  writerImg,
  views,
  date,
}: CardBoxProps) {
  return (
    <li className={styles.card_box}>
      <Link
        href={url}
        className={styles.card}>
        <div className={styles.card_box_top}>
          <Image
            src={imageSrc}
            width={230}
            height={106}
            alt="sample"
            priority
          />
          <div className={styles.card_label}>
            {isNew && (
              <p className={styles.card_label_box}>
                <span>NEW</span>
              </p>
            )}
            {isHot && (
              <p className={`${styles.card_label_box} ${styles.label_hot}`}>
                <span>HOT</span>
              </p>
            )}
          </div>
        </div>
        <div className={styles.card_box_bottom}>
          <h3 className={styles.card_box_title}>{title}</h3>
          <div className={styles.card_box_lang}>
            {Array.isArray(languages) ? (
              languages.map((lang, index) => (
                lang ? (
                  <span key={index} > < small > {lang}</small> </ span >) : ''
              ))
            ) : (
              languages ? (<span> < small > {languages}</small> </ span >) : ''
            )
            }
          </div>
          <div className={styles.box_bottom_fix}>
            <div className={styles.card_box_writer}>
              <i className={styles.writer_img}>
                {writerImg ?
                  (<Image
                    width={33}
                    height={33}
                    src={writerImg}
                    alt="로고"
                    priority
                  />)
                  : (<Image
                    width={33}
                    height={33}
                    src="/images/ico_base_user.png"
                    alt="로고"
                    priority
                  />
                  )}
              </i>
              <b>{writer}</b>
            </div>
            <div className={styles.card_box_info}>
              <div>
                <i className={styles.ico_eyes}></i>
                <span>{views}</span>
              </div>
              <div>
                <i className={styles.ico_calender}></i>
                <span>{date}</span>
              </div>
            </div>
          </div>
        </div >
      </Link >
    </li >
  );
}