import React, {useEffect, useState} from 'react';
import styles from "../common/Modal.module.css";
import approvalmodal from './ApprovalModal.module.css';
import ButtonOutline from "../../../common/button/ButtonOutline";
import ApprovalTreeView from "../treeview/ApprovalTreeView";
import Swal from "sweetalert2";
import RefTreeView from "../treeview/RefTreeView";
import {contextMappings} from "../../../../context/contextMappings";




function ApprovalModal({contextType, modalData , toggleModal}) {
    const selectedContext = contextMappings[contextType]();
    const { data, setData } = selectedContext;
    const { approvalList } = data;

    const [open, setOpen] = useState('first');

    const toggle = (name) => {
        setOpen(name);
    };

    const clear = () => {
        setData(prev => ({...prev, approvalList:[], refList:[]}));
        toggleModal();
    }

    const confirm = () =>{
        toggleModal();
    };

    useEffect(() => {
        if (approvalList.length > 4) {
            Swal.fire({
                icon: 'error',
                text: '결재선은 4명이상 선택할 수 없습니다'
            });
            setData( prev => ({...prev, approvalList:[...approvalList.slice(0, approvalList.length - 1)]}))
        }
    }, [approvalList]);


    const style = {
        marginLeft: '8px',
        padding: '8px 15px',
        fontWeight: '700'
    }

    console.log(!!modalData?.data)
    return(
        <>
            <div className={styles.container}>
                <div className={`${styles.modal} ${styles.modal_upsize}`}>
                    <span className={`material-symbols-outlined ${styles.close}`} onClick={toggleModal}>close</span>
                    <div className={styles.content_wrapper}>
                        <h2 className={styles.title}>결재선 선택</h2>
                            <ul className={approvalmodal.toolbar}>
                                <li onClick={()=>toggle('first')} className={`${approvalmodal.toolbar_list} ${open === 'first' ? approvalmodal.li_act : ''}`}>결재선</li>
                                <li onClick={()=>toggle('second')} className={`${approvalmodal.toolbar_list} ${open === 'second' ? approvalmodal.li_act : ''}`}>참조자</li>
                            </ul>
                            <div className={`${styles.content} ${open ==='first'? approvalmodal.active : approvalmodal.none}`}>
                                {

                                    !!modalData?.data ? <ApprovalTreeView contextType={contextType} modalData={modalData?.data}/> : ''
                                }
                            </div>
                            <div className={`${styles.content} ${open ==='second'? approvalmodal.active : approvalmodal.none}`}>
                                {
                                    !!modalData?.data ? <RefTreeView contextType={contextType} modalData={modalData.data}/> : ''
                                }

                            </div>
                            <div className={styles.button}>
                                <ButtonOutline style={style} value="확인" onClick={confirm}/>
                                <ButtonOutline style={style} value="취소" onClick={clear}/>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ApprovalModal;