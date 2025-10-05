'use client';

import style from './writeContent.module.scss';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import React from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import { useImageUpload } from '../hooks/useImageUpload';

export default function ToastEditor({
    editorRef,
    initialContent = '',
    postId,
    setPostId,
}: {
    editorRef: React.RefObject<any>;
    initialContent?: string;
    postId: number;
    setPostId: (id: number) => void;
}) {
    useImageUpload(editorRef, postId, setPostId);

    return (
        <div className={style.content}>
            <Editor
                ref={editorRef}
                initialValue={initialContent}
                previewStyle="vertical"
                height="500px"
                initialEditType="markdown"
                useCommandShortcut={true}
                plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            />
        </div>
    );
}
