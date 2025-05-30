'use client';

import styles from './listMainLeft.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { useEffect, useState } from 'react';

const Viewer = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Viewer), {
    ssr: false,
});

interface ListLeftProps {
    imageSrc: string;
    text: string;
    date: string;
    title: string;
    link: string;
    type: string;
    skills: string[];
    field: string;
}

export default function ListMainLeft({ text, date, title, link, imageSrc, type, skills, field }: ListLeftProps) {
    const [plugin, setPlugin] = useState<any>(null);

    useEffect(() => {
        import('@toast-ui/editor-plugin-code-syntax-highlight').then((mod) => {
            setPlugin(() => [[mod.default, { highlighter: Prism }]]);
        });
    }, []);

    return (
        <>
            <div className={styles.list_main_top}>
                <h3>
                    <span className={styles.image_wrapper}></span>
                    <span>DEVOTEE 요약</span>
                </h3>
                <p className={styles.list_days}>{date}</p>
            </div>
            <div className={styles.list_main_middle}>
                {type === 'member' && plugin ? (
                    <Viewer initialValue={text} plugins={plugin} />
                ) : (
                    <p>{text}</p>
                )}
            </div>
            {link?.trim() ? (
                <div className={styles.list_main_bottom}>
                    <h3>본문보기</h3>
                    <div className={styles.list_main_more}>
                        <Link href={link}>
                            <div className={styles.more_sum_main}>
                                <div className={styles.more_sum}>
                                    <Image src={imageSrc} fill={true} alt="sample" unoptimized />
                                </div>
                                <div className={styles.more_right}>
                                    <div className={styles.more_title}>{title}</div>
                                    <div className={styles.more_text}>
                                        {text.length > 100 ? `${text.slice(0, 90)}...` : text}
                                    </div>
                                    <div className={styles.more_bottom}>더보기 →</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            ) : null}
            <div className={styles.hashtag}>
                {skills && skills.length > 0 && skills.map((skill, index) => (
                    <span key={index} className={styles.hashtag_skills}>
                        #{skill}
                    </span>
                ))}
                {field && (
                    <span className={styles.hashtag_field}>
                        #{field}
                    </span>
                )}
            </div>
        </>
    );
}
