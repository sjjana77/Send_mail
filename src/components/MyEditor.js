import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for Quill editor

const MyEditor = ({ changefunction, valuee }) => {
  // const [value, setValue] = useState('');

  const editorStyle = {
    height: '400px', // Set your desired height here
  };

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }], // Add color and background color buttons
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean'] // remove formatting button
    ],
  };

  return (
    <div style={{ height: '400px' }}>

      <ReactQuill
        name='content'
        theme="snow"
        value={valuee}
        onChange={changefunction}
        style={editorStyle}
        modules={modules}
      />
    </div>
  );
};

export default MyEditor;
