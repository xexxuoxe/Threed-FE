'use client';

import { useEffect, useRef, useState } from 'react';
import { useWrite } from './useWrite';
import { usePost } from './usePost';
import { useParams, useRouter } from 'next/navigation';

export function usePostEdit() {
    const { id } = useParams();
    const router = useRouter();
    const postId = Number(id);

    // 수정 모드이므로 항상 true
    const isEditMode = true;
    const isPostReady = true;
    const isNewPost = false;

    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const { submit } = useWrite();
    const { post: fetchedPost, loading: postLoading, error: postError } = usePost(postId, isPostReady, isEditMode);

    const titleRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    const [field, setField] = useState('기타');
    const [skills, setSkills] = useState<string[]>([]);
    const [image, setImage] = useState<File | undefined>();
    const [thumbnailUrl] = useState<string | null>(null);
    const [initialTitle, setInitialTitle] = useState<string>('');

    // 게시물 데이터 로드
    useEffect(() => {
        if (fetchedPost) {
            console.log('✅ 게시물 데이터 로드 성공:', fetchedPost);
            setPost(fetchedPost);
            setLoading(false);

            // 초기값 설정
            setInitialTitle(fetchedPost.title || '');
            setField(fetchedPost.field || '기타');
            setSkills(fetchedPost.skills || []);

            // 폼 데이터 설정 (약간의 지연을 두고 실행)
            setTimeout(() => {
                if (titleRef.current) {
                    titleRef.current.value = fetchedPost.title || '';
                }
                if (editorRef.current) {
                    editorRef.current.getInstance().setMarkdown(fetchedPost.content || '');
                }
            }, 100);
        }

        if (postError) {
            console.error('❌ 게시물 데이터 로드 실패:', postError);
            setError(postError);
            setLoading(false);
        }
    }, [fetchedPost, postError]);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const title = titleRef.current?.value || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';

        const updatedPostId = await submit(postId, { title, content, field, skills, image }, isNewPost);

        if (updatedPostId) {
            router.push(`/m/post/view/${updatedPostId}?type=member`);
        }
    };

    return {
        postId,
        setPostId: () => { }, // 수정 모드에서는 변경 불가
        post: post || fetchedPost,
        loading: loading || postLoading,
        error: error || postError,
        titleRef,
        editorRef,
        field,
        skills,
        setField,
        setSkills,
        image,
        setImage,
        thumbnailUrl,
        initialTitle,
        handleSubmit,
    };
}
