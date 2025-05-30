import { useState, useEffect } from 'react';

export function useHashtags(maxCount = 2) {
    const [tags, setTags] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [animatedTag, setAnimatedTag] = useState<string | null>(null);

    const addTag = () => {
        const newTag = input.trim().toUpperCase();
        if (!newTag || tags.includes(newTag)) return;
        if (tags.length >= maxCount) {
            alert(`최대 ${maxCount}개의 태그만 입력할 수 있습니다.`);
            return;
        }
        setTags([...tags, newTag]);
        setAnimatedTag(newTag);
        setInput('');
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    useEffect(() => {
        if (animatedTag) {
            const timer = setTimeout(() => setAnimatedTag(null), 300);
            return () => clearTimeout(timer);
        }
    }, [animatedTag]);

    return {
        tags,
        input,
        animatedTag,
        setInput,
        setTags,
        addTag,
        removeTag,
    };
}
