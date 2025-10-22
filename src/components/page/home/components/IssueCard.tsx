// IssueCard.component.tsx
import Image from "next/image";
import usePageData from '@components/page/home/hooks/usePosts';
import CardBox from "@components/_utiles/card/CardBox.component";
import CardSkeleton from "@components/_utiles/skeleton/CardSkeleton";
import styles from "./IssueCard.module.scss";
interface HomeProps {
    condition?: 'WEEK' | 'MONTH';
}

export default function IssuCardComponent({ condition }: HomeProps) {
    const { posts, loading, error } = usePageData(condition ?? "WEEK");

    return (
        <ul className={`${styles.card_container} ${styles.issue_card_container}`}>
            <div className={styles.card_list}>
                {loading ? (
                    <CardSkeleton count={5} />
                ) : error ? (
                    <div className={styles.card_no_Data}>
                        <Image src={'/images/ico_warning.png'} width={50} height={50} alt="warning" />
                        <p className={styles.warning_text}>게시글이 없습니다</p>
                    </div>
                ) : posts && posts.length > 0 ? (
                    posts.slice(0, 5).map(item => (
                        <CardBox
                            key={item.id}
                            url={`/post/view/${item.id}?type=member`}
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
            </div>
        </ul>
    );
}
