"use client"
import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react';

// Importing Quill from 'quill-react-commercial' dynamically
const ReactQuill = dynamic(() => import('quill-react-commercial'), {
    ssr: false
});

const WriteOne = () => {
    const [content, setContent] = useState('');
    const quillRef = useRef(null);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                          // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ],
        table: true,
        codeHighlight: true
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list', 'bullet', 'script', 'indent', 'direction', 'size', 'font', 'align',
        'color', 'background', 'clean'
    ];

    const handleChange = (value) => {
        setContent(value);
    };

    return (
        <div>
            <ReactQuill
                ref={quillRef}
                value={content}
                onChange={handleChange}
                modules={modules}
                formats={formats}
            />
        </div>
    );
}

export default WriteOne;
