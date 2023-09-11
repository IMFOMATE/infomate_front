import React from 'react';
import style from "./DocFile.module.css";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DownloadButton from "./DownLoadButton";
function DocFile({handleFileChange, value}) {
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
        <div>
          {
              value && value.map(f=><DownloadButton filename={f.fileName}></DownloadButton>)
          }
        </div>

      </div>
  );
}

export default DocFile;

export const DocFileSpan = ({fileList}) => {

  return (
      <>
        <div className={style.files}>
          <p className={style.file_title}><AttachFileIcon/> 첨부파일
            { fileList.length}개
          </p>
          {
            fileList.length < 0 ? '' :
                fileList.map(f=><DownloadButton filename={f.fileName}>{f.fileName}</DownloadButton>)
          }
        </div>
      </>
  );
}