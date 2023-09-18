import axios from 'axios';
import {FILE_DOWNLOAD} from "../modules/FileModule";
import {PROTOCOL, SERVER_IP, SERVER_PORT} from "./APIConfig";

export const fileDownloadAPI = ({filename}) =>{
  const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/file/download/${filename}`;

  return async (dispatch, getState)  => {

    const result = await axios.get(requestURL, {
      responseType: 'blob', // 응답을 Blob 형태로 받아옴
    })
        .then(response => {
          const blob = new Blob([response.data]);
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename; // 다운로드될 파일 이름 설정
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('Error while downloading file:', error);
        })
        .catch(err => console.log(err));

      dispatch({type: FILE_DOWNLOAD, payload: result});
  }

}