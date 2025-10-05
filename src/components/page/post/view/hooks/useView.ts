import { useState, useEffect, useRef } from 'react';
import { api } from '@lib/api/api';

interface Author {
    name: string;
    imageUrl: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    thumbnailImageUrl: string;
    author: Author;
    viewCount: number;
    createdAt: string;
    sourceUrl?: string;
    bookmarkCount: number;
    isBookmarked: boolean;
    nextId: number | null;
    previousId: number | null;
    skills: string[];
    field: string;
}

export default function usePost(postId: number) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);
    const hasFetched = useRef(false); // ✅ 중복 호출 방지용 플래그

    useEffect(() => {
        if (!postId) return;
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchPost = async () => {
            setLoading(true);
            try {
                const url = `/api/v1/member-posts/${postId}`;
                const data = await api.get<Post>(url);
                setPost(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    return { post, loading, error };
}
