'use client';

import Image from "next/image";
import { useState } from "react";
import CardBox from "@components/_utiles/m/list/ListBox.component";
import Pagination from "@components/_utiles/pagination/pagination.component";
import CardSkeleton from "@components/_utiles/skeleton/CardSkeleton";
import styles from "./AllCard.module.scss";

interface Post {
    id: number;
    title: string;
    thumbnailImageUrl: string;
    field: string[];
    viewCount: number;
    author: {
        name: string;
        imageUrl: string;
    };
    skills: string[];
    createdAt: string;
    isNew: boolean;
    isHot: boolean;
    isCompany?: boolean;
}

interface PostListProps {
    posts: Post[];
    isLoading: boolean;
    itemsPerPage?: number;
}

export default function AllCardComponent({ posts, itemsPerPage = 20, isLoading = false }: PostListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = Array.isArray(posts)
        ? posts.slice(indexOfFirstItem, indexOfLastItem)
        : [];

    const totalItems = Array.isArray(posts) ? posts.length : 0;

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className={styles.home_card_container}>
                <ul className={styles.card_list}>
                    {isLoading ? (
                        <CardSkeleton count={itemsPerPage} />
                    ) : currentItems && currentItems.length > 0 ? (
                        currentItems.map((item) => (
                            <CardBox
                                key={item.id}
                                url={`/m/post/view/${item.id}?type=member`}
                                imageSrc={item.thumbnailImageUrl}
                                isNew={item.isNew}
                                isHot={item.isHot}
                                title={item.title}
                                languages={item?.skills?.length ? item.skills : item.field}
                                writer={item.author?.name}
                                writerImg={item.author?.imageUrl}
                                views={item.viewCount}
                                date={new Date(item.createdAt).toLocaleDateString("ko-KR")}
                            />
                        ))
                    ) : (
                        <div className={styles.card_no_Data}>
                            <Image src={'/images/ico_warning.png'} width={50} height={50} alt="warning" />
                            <p className={styles.warning_text}>게시글이 없습니다</p>
                        </div>
                    )}
                </ul>
            </div>

            {totalItems > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalItems / itemsPerPage)}
                    onPageChange={paginate}
                />
            )}
        </>
    );
}
