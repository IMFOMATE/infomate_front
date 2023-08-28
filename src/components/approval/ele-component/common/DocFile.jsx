import React from 'react';
import style from "./DocFile.module.css";

function DocFile({handleFileChange}) {
  return (
      <div className={style.files}>
        <label htmlFor="docFile">파일 첨부</label>
        <input accept='image/jpg,image/png,image/jpeg,image/gif'
               className={style.fileBtn}
               id="docFile"
               type="file"
               name='fileList'
               onChange={handleFileChange}
               multiple />
      </div>
  );
}

export default DocFile;