import React from 'react';
import styles from "../common/Modal.module.css";
import ButtonOutline from "../../../common/button/ButtonOutline";
import TreeView from "../treeview/TreeView";
import ApprovalTreeView from "../treeview/ApprovalTreeView";

function ApprovalModal({ toggleModal}) {

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
                        <h2 className={styles.title}>결재선 선택</h2>
                            <div className={styles.content}>
                                <ApprovalTreeView/>
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

export default ApprovalModal;