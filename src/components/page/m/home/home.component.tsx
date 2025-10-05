'use client';

import { useState, useEffect } from 'react';
import IssuCardComponent from './components/IssueCard';
import AllCardcomponent from './components/AllCard';
import FilterComponent from './components/Filter';
import { fetchPosts } from './hooks/useFilteredPosts';
import { skillOptions, techStackOptions } from './constants/filterOptions';
import styles from './home.module.scss';

interface HomeProps {
    condition?: 'WEEK' | 'MONTH';
}

export default function HomeComponent({ }: HomeProps) {
    const [period, setPeriod] = useState<'WEEK' | 'MONTH'>('WEEK');
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    const [keyword, setKeyword] = useState<string>('');
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fieldFilterOptions = techStackOptions;

    // 필터링된 데이터 가져옴
    useEffect(() => {
        const loadFilteredPosts = async () => {
            setIsLoading(true);
            try {
                const data = await fetchPosts({
                    skills: selectedSkills,
                    fields: selectedFields,
                    keyword: keyword
                });
                setPosts(data);
            } catch (error) {
                console.error('데이터 로드 중 오류 발생:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadFilteredPosts()
    }, [selectedSkills, selectedFields, keyword]);

    const handleSkillClick = (skill: string) => {
        setSelectedSkills((prev) => {
            const updated = prev.includes(skill)
                ? prev.filter((s) => s !== skill)
                : [...prev, skill];

            return updated;
        });
    };

    const handleFieldClick = (field: string) => {
        setSelectedFields((prev) => {
            const updated = prev.includes(field)
                ? prev.filter((f) => f !== field)
                : [...prev, field];

            return updated;
        });
    };

    const handleReset = () => {
        setSelectedSkills([]);
        setSelectedFields([]);
        setKeyword('');
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const searchValue = formData.get('search') as string;
        if (!searchValue) {
            alert("검색어를 입력해주세요.")
        }
        setKeyword(searchValue);
    };


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'week') setPeriod('WEEK');
        else if (value === 'month') setPeriod('MONTH');
    };

    return (
        <main className={styles.inner}>
            {/* start */}
            {/* title - 가장 많이 읽은 글 */}
            <div className={styles.main_header}>
                <h2><span className={styles.ico_fire}></span>가장 많이 읽은 글</h2>
                <div className={styles.date_list}>
                    <select name="date" id="date-select" onChange={handleChange}>
                        <option value="week">일주일</option>
                        <option value="month">1개월</option>
                    </select>
                </div>
            </div>
            <IssuCardComponent condition={period} />
            <div className={styles.main_header}>
                <h2><span className={styles.ico_face}></span>새로운 기술을 확인해보세요.</h2>
            </div>
            <FilterComponent
                label="스킬"
                fields={skillOptions}
                skills={fieldFilterOptions}
                selectedSkills={selectedSkills}
                selectedFields={selectedFields}
                onSkillClick={handleSkillClick}
                onFieldClick={handleFieldClick}
                onReset={handleReset}
                onSearch={handleSearch}
            />
            <AllCardcomponent
                posts={posts}
                isLoading={isLoading}
            />
            {/* end */}
        </main>
    );
};


