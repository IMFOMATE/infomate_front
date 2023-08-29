import React from 'react';
import style from "./DocFile.module.css";
import AttachFileIcon from '@mui/icons-material/AttachFile';
function DocFile({handleFileChange}) {
  return (
      <div className={style.files}>
        <label htmlFor="docFile">파일 첨부</label>
        <input className={style.fileBtn}
               id="docFile"
               type="file"
               name='fileList'
               onChange={handleFileChange}
               multiple
        />
      </div>
  );
}

export default DocFile;

export const DocFileSpan = ({fileList}) => {
  return (
      <>
        <div className={style.files}>
          <p className={style.file_title}><AttachFileIcon/> 첨부파일 {fileList.length}개</p>
           {fileList ?? ''}
        </div>
      </>
  );
}