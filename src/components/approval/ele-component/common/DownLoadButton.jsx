import {useDispatch, useSelector} from "react-redux";
import {fileDownloadAPI} from "../../../../apis/FileAPICalls";
import DownloadIcon from '@mui/icons-material/Download';
import styles from './DownloadButton.module.css';

const DownloadButton = ({ filename }) => {
  const dispatch = useDispatch();
  const handleDownloadClick = () => {
    dispatch(fileDownloadAPI({filename}));
  };


  return (
      <>
        <div onClick={handleDownloadClick} className={styles.download_wrapper}>
          <DownloadIcon sx={{ color: 'var(--color-hard)'}} />
          <span>{filename}</span>
        </div>
      </>

  );
};

export default DownloadButton;