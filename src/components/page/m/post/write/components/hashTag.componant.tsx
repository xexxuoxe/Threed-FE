'use client';

import styles from '../postWrite.module.scss';
import { useHashtags } from '../hooks/useHashtag';
import { useEffect } from 'react';

interface HashtagInputProps {
    onChange: (tags: string[]) => void;
    initialTags?: string[];
}

export default function HashtagInput({ onChange, initialTags = [] }: HashtagInputProps) {
    const { tags, input, animatedTag, setInput, addTag, removeTag, setTags } = useHashtags();

    // ✅ 최초 마운트 시 initialTags 값을 세팅
    useEffect(() => {
        if (initialTags.length > 0) {
            setTags(initialTags);
        }
    }, [initialTags, setTags]);

    // ✅ 변경되면 부모에 전달
    useEffect(() => {
        onChange(tags);
    }, [tags, onChange]);

    return (
        <div className={styles.write_hashtag_box}>
            {tags.map(tag => (
                <span
                    key={tag}
                    className={`${styles.tag_item} ${animatedTag === tag ? styles.animate : ''}`}
                    onClick={() => removeTag(tag)}
                >
                    #{tag}
                </span>
            ))}
            <input
                type="text"
                id="write-hashtag"
                value={input}
                placeholder="기술 최대 2개 태그"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                    }
                }}
            />
        </div>
    );
}
