import styles from './Modal.module.css';
import {useModal} from "../../../../context/ModalContext";
import ButtonOutline from "../../../common/button/ButtonOutline";

function Modal({title,content}) {
    const {toggleModal} = useModal(); // 모달 상태 및 함수 가져오기
    const style = {
        padding: '8px 15px',
        fontWeight: '700'
    }

    return(
        <>
            <div className={styles.container}>
                <div className={styles.modal}>
                    <span className={`material-symbols-outlined ${styles.close}`} onClick={toggleModal}>close</span>
                    <div className={styles.content_wrapper}>
                        <h2 className={styles.title}>{title}</h2>
                        <div className={styles.content}>
                            {content}
                        </div>
                        <div className={styles.button}>
                            <ButtonOutline style={style} value="취소" onClick={toggleModal}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;