'use client';

import styles from "./postWrite.module.scss";
import dynamic from 'next/dynamic';
import HashtagInput from './components/hashTag.componant';
import FieldSelector from './components/fileSelector.componant';
import { usePostEdit } from './hooks/usePostEdit';
import Loading from '@lib/loading/full.component';
import { useRouter } from 'next/navigation';

const WriteContent = dynamic(() => import('./components/writeContent.component'), { ssr: false });

export default function EditComponent() {
    const router = useRouter();

    const {
        postId,
        setPostId,
        post,
        loading,
        error,
        titleRef,
        editorRef,
        field,
        skills,
        setField,
        setSkills,
        initialTitle,
        handleSubmit,
    } = usePostEdit();

    if (loading) return <Loading />;

    if (error) {
        console.error('❌ 수정 페이지 에러:', error);
        alert('게시물을 불러올 수 없습니다.');
        router.replace('/');
        return null;
    }

    return (
        <div className={styles.write_main}>
            <h2>
                <span className={styles.img_box}></span>
                <span>글 수정</span>
            </h2>
            <form>
                <ul className={styles.write_list}>
                    <li>
                        <label>제목</label>
                        <input
                            type="text"
                            id="write-title"
                            ref={titleRef}
                            placeholder="제목을 입력해주세요"
                            defaultValue={initialTitle}
                        />
                    </li>
                    <li>
                        <ul>
                            <li>
                                <label>해시태그</label>
                                <HashtagInput onChange={setSkills} initialTags={skills} />
                            </li>
                            <li>
                                <label>분야</label>
                                <FieldSelector onChange={setField} initialValue={field} />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className={styles.write_txt}>내용</div>
                        <WriteContent
                            editorRef={editorRef}
                            initialContent={post?.content || "내용을 입력해주세요."}
                            postId={postId}
                            setPostId={setPostId}
                        />
                    </li>
                    <li>
                        <div className={styles.btn_box}>
                            <button
                                type="button"
                                className={styles.return}
                                onClick={() => router.push('/blog')}
                            >
                                목록
                            </button>
                            <button className={styles.submit} onClick={handleSubmit} type="button">
                                수정
                            </button>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    );
}
