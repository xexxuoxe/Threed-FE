import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import usePageData from '@components/page/home/hooks/usePosts';
import CardBox from "@components/_utiles/m/card/CardBox.component";
import CardSkeleton from "@components/_utiles/m/skeleton/CardSkeleton";
import styles from "./IssueCard.module.scss";
import 'swiper/css';

interface HomeProps {
  condition?: 'WEEK' | 'MONTH';
}

export default function IssuCardComponent({ condition }: HomeProps) {
  const { posts, loading, error } = usePageData(condition ?? "WEEK");

  return (
    <ul className={`${styles.card_container} ${styles.issue_card_container}`}>
      {loading ? (
        <div className={styles.card_list}>
          <Swiper spaceBetween={25} slidesPerView={2.4}>
            {Array(5).fill(0).map((_, index) => (
              <SwiperSlide key={`skeleton-${index}`}>
                <CardSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : error ? (
        <div className={styles.card_no_Data}>
          <Image src={'/images/ico_warning.png'} width={50} height={50} alt="warning" />
          <p className={styles.warning_text}>게시글이 없습니다</p>
        </div>
      ) : posts && posts.length > 0 ? (
        <div className={styles.card_list}>
          <Swiper spaceBetween={25} slidesPerView={2.4}>
            {posts.slice(0, 5).map(item => (
              <SwiperSlide key={item.id}>
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className={styles.card_no_Data}>
          <Image src={'/images/ico_warning.png'} width={50} height={50} alt="warning" />
          <p className={styles.warning_text}>게시글이 없습니다</p>
        </div>
      )}
    </ul>
  );
}
