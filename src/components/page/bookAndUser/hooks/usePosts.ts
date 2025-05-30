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
    elements: Post[],
    pageNumber: number,
    pageSize: number,
    totalCount: number,
    totalPage: number
}

export default function usePageData(type: 'bookmark' | 'mypage') {
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response: PostResponse;

                if (type === 'bookmark') {
                    response = await api.get<PostResponse>('/api/v1/bookmarks?page=1&size=999999');
                    setTitle('MY 북마크');
                    setIcon('ico_heart');
                } else {
                    response = await api.get<PostResponse>('/api/v1/members/posts?page=1&size=999999');
                    setTitle('MY PAGE');
                    setIcon('ico_mypage');
                }

                setPosts(response.elements);
            } catch (error) {
                console.error('데이터 로드 중 오류 발생:', error);
            } finally {
                setLoading(false);

            }
        };

        fetchData();
    }, [type]);

    return { posts, icon, title, loading };
}