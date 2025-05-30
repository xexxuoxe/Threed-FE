import { useCallback } from 'react';

export default function useCopyToClipboard() {
    const copy = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('복사되었습니다!');
        } catch (err) {
            console.error('복사 실패:', err);
            alert('복사에 실패했습니다.');
        }
    }, []);

    return copy;
}
