'use client';

import { useState } from 'react';
import { api } from '@lib/api/api';

export default function useBookmark(postId: number, initialState: boolean) {
    const [bookmarked, setBookmarked] = useState<boolean>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    const toggleBookmark = async () => {
        setLoading(true);
        setError(null);

        try {
            if (!bookmarked) {
                await api.post(`/api/v1/bookmarks/${postId}`);
            } else {
                await api.delete(`/api/v1/bookmarks/${postId}`);
            }

            setBookmarked(!bookmarked);
        } catch (err) {
            console.error('북마크 처리 실패:', err);
            alert('북마크 처리에 실패했습니다.');
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { bookmarked, toggleBookmark, loading, error };
}
