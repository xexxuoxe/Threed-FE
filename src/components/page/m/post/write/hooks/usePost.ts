import { useState, useEffect } from 'react';
import { api } from '@lib/api/api';

interface Post {
    id: number;
    title: string;
    content: string;
    field: string;
    skills: string[];
}

export function usePost(
    postId: number | undefined,
    enabled: boolean = true,
    isEditMode: boolean = false // ✅ 수정 모드 여부 추가
) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (!enabled || !postId || postId === 1) return;

        const fetchPost = async () => {
            setLoading(true);
            try {
                const url = isEditMode
                    ? `/api/v1/member-posts/${postId}/edit`
                    : `/api/v1/member-posts/${postId}`;
                const data = await api.get<Post>(url);
                setPost(data);
            } catch (err) {
                console.error("❌ 게시물 조회 중 에러:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId, enabled, isEditMode]);

    return { post, loading, error };
}
