import styles from './Modal.module.css';
import {useModal} from "../../../../context/ModalContext";
import ButtonOutline from "../../../common/button/ButtonOutline";
import TreeView from "../treeview/TreeView";

function Modal({ modalId, title }) {
    const { isModalOpen, toggleModal } = useModal(modalId); // 모달 별 상태가져오기
    const style = {
        padding: '8px 15px',
        fontWeight: '700'
    }

    console.log(isModalOpen);

    // 각 모달에 따른 내용을 조건부로 렌더링
    const renderModalContent = () => {
        if (modalId === 'documentKind') {
            return (
                <TreeView/>
            );
        } else if (modalId === 'approval') {
            return (
                <div>
                    {/* 모달 2의 내용 */}
                </div>
            );
        }
        // 모달 추가시 조건을 주자
    };

    return (
        <div className={`${styles.container} ${isModalOpen ? '' : styles.none}`}>
            <div className={styles.modal}>
                 <span className={`material-symbols-outlined ${styles.close}`} onClick={toggleModal}>close</span>
                <div className={styles.content_wrapper}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.content}>
                        {renderModalContent()}
                    </div>
                    <div className={styles.button}>
                        <ButtonOutline style={style} value="취소" onClick={toggleModal}/>
                    </div>
                </div>
            </div>
        </div>
    );


    // return(
    //     <>
    //         <div className={styles.container}>
    //             <div className={styles.modal}>
    //                 <span className={`material-symbols-outlined ${styles.close}`} onClick={toggleModal}>close</span>
    //                 <div className={styles.content_wrapper}>
    //                     <h2 className={styles.title}>{title}</h2>
    //                     <div className={styles.content}>
    //                         {content}
    //                     </div>
    //                     <div className={styles.button}>
    //                         <ButtonOutline style={style} value="취소" onClick={toggleModal}/>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // );
}

export default Modal;