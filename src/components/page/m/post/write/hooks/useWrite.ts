import { useCallback } from "react";
import { api } from "@lib/api/api";
import axios from "axios";

interface WriteFormData {
    title: string;
    content: string;
    field: string;
    skills: string[];
    image?: File;
}

export function useWrite() {
    const submit = useCallback(
        async (postId: number, data: WriteFormData, isNewPost: boolean): Promise<number | null> => {
            try {
                const isEmpty = (text: string) => !text || text.trim() === "";

                if (isEmpty(data.title)) {
                    alert("제목을 입력해주세요.");
                    return null;
                }
                if (data.title.length > 100) {
                    alert("제목의 텍스트가 너무 많습니다. (최대 100자)");
                    return null;
                }
                if (isEmpty(data.content)) {
                    alert("본문을 입력해주세요.");
                    return null;
                }
                if (data.content.length > 10000) {
                    alert("본문의 텍스트가 너무 많습니다. (최대 10,000자)");
                    return null;
                }

                // 이미지 업로드 처리 (새 글 작성 시)
                let imageUrl = "";
                if (data.image && isNewPost) {
                    console.log('🔍 이미지 업로드 중...');
                    // 임시 게시물 생성 후 이미지 업로드
                    const tempResponse = await api.post<{ postId: number }>("/api/v1/member-posts");
                    const tempId = tempResponse.postId;

                    const uploadInfo = await api.post<{ presignedUrl: string; fileUrl: string }>(
                        `/api/v1/member-posts/${tempId}/images`
                    );
                    await axios.put(uploadInfo.presignedUrl, data.image, {
                        headers: { "Content-Type": data.image.type },
                    });
                    imageUrl = uploadInfo.fileUrl;
                    console.log('✅ 이미지 업로드 완료:', imageUrl);
                }

                // 게시물 데이터 준비
                const payload = {
                    title: data.title,
                    content: data.content,
                    field: data.field,
                    skills: data.skills || [],
                    thumbnailImageUrl: imageUrl,
                };

                console.log('🔍 게시물 데이터 전송:', payload);

                // 게시물 저장/수정
                let resultId;
                if (isNewPost) {
                    // 새 글 작성: 한 번의 API 호출로 완료
                    const response = await api.post<{ postId: number }>("/api/v1/member-posts", payload);
                    resultId = response.postId;
                    console.log('✅ 새 게시물 생성 완료:', resultId);
                } else {
                    // 기존 글 수정 (PATCH 대신 PUT 사용)
                    await api.put(`/api/v1/member-posts/${postId}`, payload);
                    resultId = postId;
                    console.log('✅ 게시물 수정 완료:', resultId);
                }

                console.log('✅ 게시물 저장 완료:', resultId);
                alert("✅ 게시물이 저장되었습니다.");
                return resultId;
            } catch (err) {
                console.error("❌ 게시물 저장 중 에러:", err);
                alert("❌ 저장 중 오류 발생");
                return null;
            }
        },
        []
    );

    return { submit };
}
