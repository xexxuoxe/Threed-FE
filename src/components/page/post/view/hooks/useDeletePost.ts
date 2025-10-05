'use client';

import { useRouter } from 'next/navigation';
import { api } from '@lib/api/api';

export default function useDeletePost(postId: number) {
    const router = useRouter();

    const deletePost = async () => {
        const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmDelete) return;

        try {
            await api.delete(`/api/v1/member-posts/${postId}`);

            alert('✅ 게시물이 삭제되었습니다.');
            router.push('/'); // ✅ 삭제 후 목록 이동
        } catch (error) {
            console.error('❌ 삭제 오류:', error);
            alert('❌ 삭제 중 오류가 발생했습니다.');
        }
    };

    return { deletePost };
}
