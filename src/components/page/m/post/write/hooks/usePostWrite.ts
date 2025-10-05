'use client';

import { useEffect, useRef, useState } from 'react';
import { useWrite } from './useWrite';
import { usePost } from './usePost';
import { useRouter } from 'next/navigation';

export function usePostWrite() {
    const router = useRouter();
    // URL 파라미터가 없으므로 항상 새 글 작성 모드
    const isEditMode = false;
    const initialPostId = 1; // 새 글은 1로 시작

    const [postId, setPostId] = useState<number>(initialPostId);
    const [isPostReady] = useState<boolean>(false);
    const [isNewPost, setIsNewPost] = useState<boolean>(true);

    const { submit } = useWrite();
    const { post, loading, error } = usePost(postId, isPostReady, isEditMode);

    const titleRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    const [field, setField] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [image, setImage] = useState<File | undefined>();
    const [thumbnailUrl] = useState<string | null>(null);

    const didInit = useRef(false);
    useEffect(() => {
        if (!didInit.current && post) {
            didInit.current = true;
            setIsNewPost(false);
            if (titleRef.current) {
                titleRef.current.value = post.title;
            }
            if (editorRef.current) {
                editorRef.current.getInstance().setMarkdown(post.content);
            }
            setField(post.field);
            setSkills(post.skills);
        }
    }, [post]);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const title = titleRef.current?.value || '';
        const content = editorRef.current?.getInstance().getMarkdown() || '';

        const newPostId = await submit(postId, { title, content, field, skills, image }, isNewPost);

        if (newPostId) {
            router.push(`/post/view/${newPostId}?type=member`);
        }
    };

    return {
        postId,
        setPostId,
        post,
        loading,
        error,
        titleRef,
        editorRef,
        setField,
        setSkills,
        handleSubmit,
        setImage,
        field,
        skills,
        image,
        thumbnailUrl,
    };
}
