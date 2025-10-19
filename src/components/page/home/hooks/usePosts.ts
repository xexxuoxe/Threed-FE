// hooks/usePopularPosts.ts
import { useEffect, useState } from 'react';
import { api } from '@lib/api/api';

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

interface PostResponse {
    elements: Post[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
}

export default function usePageData(
    condition?: 'WEEK' | 'MONTH'
) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const response = await api.get<PostResponse>(
                    `/api/v1/member-posts/popular?condition=${condition}`
                );
                setPosts(response.elements);
            } catch (err) {
                setError(err);
                console.log("1차 error");
            } finally {
                setLoading(false);
            }
        };

        fetchPopular();
    }, [condition]);

    return { posts, loading, error };
}
