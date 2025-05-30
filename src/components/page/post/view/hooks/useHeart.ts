import { useEffect, useRef, useState } from 'react';
import useBookmark from './useBook';

export default function useHeart(postId: number, isBookmarked: boolean) {
    const { bookmarked, toggleBookmark, loading, error } = useBookmark(postId, isBookmarked);
    // 상태를 비교해서 1인지 0인지
    const [heartCount, setHeartCount] = useState(isBookmarked ? 1 : 0);
    const prevRef = useRef(isBookmarked);

    // 북마크 상태로 북마크 증감처리
    useEffect(() => {
        if (bookmarked !== prevRef.current) {
            setHeartCount((prev) => prev + (bookmarked ? 1 : -1));
            prevRef.current = bookmarked;
        }
    }, [bookmarked]);

    return { bookmarked, toggleBookmark, heartCount, loading, error };
}
