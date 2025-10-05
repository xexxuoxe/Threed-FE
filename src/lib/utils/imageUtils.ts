/**
 * 이미지 URL 유틸리티 함수들
 */

/**
 * 이미지 URL이 유효한지 확인
 * @param url 이미지 URL
 * @returns 유효한 URL인지 여부
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
    if (!url || typeof url !== 'string') return false;

    const trimmedUrl = url.trim();
    if (!trimmedUrl) return false;

    // via.placeholder.com 같은 플레이스홀더 URL 제외
    if (trimmedUrl.includes('via.placeholder.com')) return false;

    // 기본적인 URL 형식 검증
    try {
        new URL(trimmedUrl);
        return true;
    } catch {
        return false;
    }
}

/**
 * 안전한 이미지 URL 반환 (유효하지 않으면 기본 이미지)
 * @param url 원본 이미지 URL
 * @param fallback 기본 이미지 URL
 * @returns 안전한 이미지 URL
 */
export function getSafeImageUrl(
    url: string | null | undefined,
    fallback: string = '/images/ico_warning.png'
): string {
    return isValidImageUrl(url) ? url! : fallback;
}

/**
 * 이미지 로드 에러 핸들러
 * @param event 이미지 에러 이벤트
 * @param fallbackSrc 대체 이미지 URL
 */
export function handleImageError(
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    fallbackSrc: string = '/images/ico_warning.png'
): void {
    const target = event.currentTarget;
    if (target.src !== fallbackSrc) {
        target.src = fallbackSrc;
    }
}

