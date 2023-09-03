import {useDispatch, useSelector} from "react-redux";
import {fileDownloadAPI} from "../../../../apis/FileAPICalls";
import {FILE_DOWNLOAD} from "../../../../modules/FileModule";



const DownloadButton = ({ filename }) => {
  const dispatch = useDispatch();
  const handleDownloadClick = () => {
    dispatch(fileDownloadAPI({filename}));
  };


  return (
      <button onClick={handleDownloadClick}>{filename}</button>
  );
};

export default DownloadButton;