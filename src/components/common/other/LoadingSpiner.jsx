import { FadeLoader } from 'react-spinners';
import styles from './loadingSpiner.module.css';

export const LoadingSpiner = () => {
    return  <div className={styles.loading}><FadeLoader color="#9F8AFB" /></div>;
}