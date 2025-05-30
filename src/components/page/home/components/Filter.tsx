// components/Filter.tsx
import styles from "./Filter.module.scss";

interface FilterProps {
    label: string;
    skills: string[];
    fields: string[];
    selectedSkills: string[];
    selectedFields: string[];
    onSkillClick: (skill: string) => void;
    onFieldClick: (field: string) => void;
    onReset: () => void;
    onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function FilterComponent({
    label,
    skills,
    fields,
    selectedSkills,
    selectedFields,
    onSkillClick,
    onFieldClick,
    onReset,
    onSearch
}: FilterProps) {
    return (
        <div className={styles.filter_area}>
            <div className={styles.filter_area_top}>
                <form role="search" onSubmit={onSearch}>
                    <div>
                        <input
                            type="search"
                            name="search"
                            placeholder="원하는 키워드를 검색해주세요."
                        />
                        <button type="submit"><i className={styles.ico_search}></i></button>
                    </div>
                    <button type="reset" className={styles.reset_btn} onClick={onReset}>초기화</button>
                </form>
            </div>

            <div className={styles.filter_area_bottom}>
                <ul>
                    <FilterGroup label={label} options={skills} selected={selectedSkills} onClick={onSkillClick} />
                    <FilterGroup label="분야" options={fields} selected={selectedFields} onClick={onFieldClick} />
                </ul>
            </div>
        </div>
    );
}

function FilterGroup({
    label,
    options,
    selected,
    onClick,
}: {
    label: string;
    options: string[];
    selected: string[];
    onClick: (option: string) => void;
}) {
    return (
        <li>
            <span className={styles.subject_txt}>{label}</span>
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    className={selected.includes(option) ? styles.active : ''}
                    onClick={() => onClick(option)}
                >
                    {option}
                </button>
            ))}
        </li>
    );
}