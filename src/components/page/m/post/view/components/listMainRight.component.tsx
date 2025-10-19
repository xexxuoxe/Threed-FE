'use client';

import styles from './listMainRight.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import useCopy from '../hooks/useCopy';
import useHeart from '../hooks/useHeart';
import React, { useEffect, useState } from "react";
import { isSession } from "@lib/session/useAuthCheck";
import { useRouter } from 'next/navigation';
import useDeletePost from '../hooks/useDeletePost';

interface ListRightProps {
    write: string;
    views: number;
    hearts: number;
    before: string;
    after: string;
    company: string;
    postId: number;
    isBookmarked: boolean;
    type: string;
}

export default function ListMainRight({ write, views, before, after, company, postId, isBookmarked, type }: ListRightProps) {
    // hook 상태 관리
    const { bookmarked, toggleBookmark, heartCount } = useHeart(postId, isBookmarked);
    // 클립보드 복사 훅
    const copyToClipboard = useCopy();
    // 북마크 클릭시 호출 함수
    const handleBookmark = async () => {
        await toggleBookmark();
    };
    // 공유 버튼 클릭시 호출 함수
    const handleCopy = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        copyToClipboard(window.location.href);
    };
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/post/edit/${postId}`);
    };
    const { deletePost } = useDeletePost(postId);
    const listLink = '/blog';

    const [session, setSession] = useState(false);

    useEffect(() => {
        setSession(isSession());
    }, []);

    return (
        <>
            <div className={styles.right_card_box}>
                <div className={styles.main_right_card}>
                    <h3>
                        <span className={styles.img_box}>
                            {company && company.trim() ? (
                                <div className={styles.more_sum}>
                                    <Image src={company} fill={true} alt="sample" unoptimized />
                                </div>
                            ) : (
                                <Image
                                    fill={true}
                                    src="/images/ico_base_user.png"
                                    alt="로고"
                                />
                            )}
                        </span>
                        <span>{write}</span>
                    </h3>
                    <div className={styles.card_list}>
                        <div className={styles.card_list_second}>
                            <button onClick={handleBookmark}>
                                <span className={`${styles.heart_box} ${bookmarked ? styles.active : ''}`}></span>
                                <p>{heartCount}</p>
                            </button>
                            <button>
                                <span className={styles.view_box}></span>
                                <p>{views}</p>
                            </button>
                        </div>
                        <ul className={styles.navi_list}>
                            <li>
                                <Link href={listLink}>목록</Link>
                            </li>
                            {before && before !== '#' && (
                                <li>
                                    <Link href={{ pathname: `${before}`, query: { type } }}>
                                        이전글
                                    </Link>
                                </li>
                            )}
                            {after && after !== '#' && (
                                <li>
                                    <Link href={{ pathname: `${after}`, query: { type } }}>
                                        다음글
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <div className={styles.share_btn}>
                            <Link href="#" onClick={handleCopy}>
                                <span className={styles.share_img}></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {session ?
                <div className={styles.button_box}>
                    <button className={styles.edit_btn} onClick={handleEdit}>수정하기</button>
                    <button className={styles.delete_btn} onClick={deletePost}>삭제하기</button>
                </div>
                : ''
            }
        </>
    );
}
