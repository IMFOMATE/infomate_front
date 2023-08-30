import React from 'react';
import ReactQuill from "react-quill";
import './Editor.css';

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];

const modules = {
  toolbar: toolbarOptions
}

function Editor({handler}) {
  return (
      <ReactQuill
          modules={modules}
          onChange={(value, delta, source, editor) => handler(prev => ({...prev, content:editor.getHTML()}))}
      />
  );
}

export default Editor;
