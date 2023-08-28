import React, {useEffect, useState} from 'react';
import styles from "../common/Modal.module.css";
import approvalmodal from './ApprovalModal.module.css';
import ButtonOutline from "../../../common/button/ButtonOutline";
import TreeView from "../treeview/TreeView";
import ApprovalTreeView from "../treeview/ApprovalTreeView";
import Swal from "sweetalert2";
import {useDraftDataContext} from "../../../../context/approval/DraftDataContext";
import RefTreeView from "../treeview/RefTreeView";
import {usePaymentDataContext} from "../../../../context/approval/PaymentDataContext";
import {useVacationDataContext} from "../../../../context/approval/VacationDataContext";
import {contextMappings} from "../../../../context/contextMappings";


const SampleData =
[
    {
        "id": 1,
        "parent": 0,
        "droppable": true,
        "text": "본부",
        "data": null,
    },
    {
        "id": 2,
        "parent": 1,
        "droppable": false,
        "text": "홍길동",
        "data": {
            "fileType": "person",
            "rank" : '상무',
            "profile": '/img/user.jpg'
        }
    },
    {
        "id": 3,
        "parent": 0,
        "droppable": true,
        "text": "개발팀",
        "data": null
    },
    {
        "id": 5,
        "parent": 0,
        "droppable": true,
        "text": "지원팀",
        "data": null
    },
    {
        "id": 6,
        "parent": 0,
        "droppable": true,
        "text": "영업팀",
        "data": null
    },
    {
        "id": 7,
        "parent": 6,
        "droppable": false,
        "text": "김길동",
        "data": {
            "fileType": "person",
            "rank" : '팀장',
            "profile": '/img/user.jpg'
        }
    },
    {
        "id": 8,
        "parent": 2,
        "droppable": false,
        "text": "주진선",
        "data": {
            "fileType": "person",
            "rank" : '사원',
        "profile": '/img/user.jpg'
        }
    },
    {
        "id": 9,
        "parent": 2,
        "droppable": false,
        "text": "김씨",
        "data": {
            "fileType": "person",
            "rank": '사원',
            "profile": '/img/user.jpg'
        }
    },
    {
        "id": 10,
        "parent": 3,
        "droppable": false,
        "text": "박씨",
        "data": {
            "fileType": "person",
            "rank": '과장',
            "profile": '/img/user.jpg'
        }
    },
    {
        "id": 11,
        "parent": 3,
        "droppable": false,
        "text": "이씨",
        "data": {
            "fileType": "person",
            "rank": '팀장',
            "profile": '/img/user.jpg'
        }
    }
];


function ApprovalModal({contextType, modalData , toggleModal}) {
    const selectedContext = contextMappings[contextType]();

    const { data, setData } = selectedContext;
    const {approvalList} = data;
    const [open, setOpen] = useState('first');

    const toggle = (name) => {
        setOpen(name);
    };


    const clear = () => {
        setData(prev => ({...prev, approvalList:[]}));
        toggleModal();
    }

    const confirm = () =>{
        toggleModal();

    };

    useEffect(() => {
        if (approvalList.length > 4) {
            Swal.fire(
                'The Internet?',
                'That thing is still around?',
                'question'
            )
            setData(prev=>({...prev,approvalList:[...approvalList.slice(0, approvalList.length - 1)]}))
        }
    }, [approvalList]);


    const style = {
        marginLeft: '8px',
        padding: '8px 15px',
        fontWeight: '700'
    }

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
                                <ApprovalTreeView contextType={contextType} modalData={SampleData}/>
                            </div>
                            <div className={`${styles.content} ${open ==='second'? approvalmodal.active : approvalmodal.none}`}>
                                <RefTreeView contextType={contextType} modalData={SampleData}/>
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