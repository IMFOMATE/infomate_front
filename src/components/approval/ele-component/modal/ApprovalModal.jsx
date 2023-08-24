import React from 'react';
import styles from "../common/Modal.module.css";
import ButtonOutline from "../../../common/button/ButtonOutline";
import TreeView from "../treeview/TreeView";
import ApprovalTreeView from "../treeview/ApprovalTreeView";


const SampleData =
[
    {
        "id": 1,
        "parent": 0,
        "droppable": true,
        "text": "본부"
    },
    {
        "id": 2,
        "parent": 0,
        "droppable": true,
        "text": "개발팀"
    },
    {
        "id": 3,
        "parent": 0,
        "droppable": true,
        "text": "지원팀"
    },
    {
        "id": 4,
        "parent": 0,
        "droppable": true,
        "text": "영업팀"
    },
    {
        "id": 5,
        "parent": 1,
        "droppable": false,
        "text": "홍길동",
        "data": {
            "fileType": "person",
            "rank" : '상무'
        }
    },
    {
        "id": 6,
        "parent": 1,
        "droppable": false,
        "text": "김길동",
        "data": {
            "fileType": "person",
            "rank" : '팀장'
        }
    },
    {
        "id": 7,
        "parent": 2,
        "droppable": false,
        "text": "주진선",
        "data": {
            "fileType": "person",
            "rank" : '사원'
        }
    },
    {
        "id": 8,
        "parent": 2,
        "droppable": false,
        "text": "김씨",
        "data": {
            "fileType": "person",
            "rank": '사원'
        }
    },
    {
        "id": 9,
        "parent": 3,
        "droppable": false,
        "text": "박씨",
        "data": {
            "fileType": "person",
            "rank": '과장'
        }
    },
    {
        "id": 10,
        "parent": 3,
        "droppable": false,
        "text": "이씨",
        "data": {
            "fileType": "person",
            "rank": '팀장'
        }
    }
];

function ApprovalModal({modalData , toggleModal}) {


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
                            <div className={styles.content}>
                                <ApprovalTreeView data={SampleData}/>
                            </div>
                            <div className={styles.button}>
                                <ButtonOutline style={style} value="확인" onClick={toggleModal}/>
                                <ButtonOutline style={style} value="취소" onClick={toggleModal}/>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ApprovalModal;