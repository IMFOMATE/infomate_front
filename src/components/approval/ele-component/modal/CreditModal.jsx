import React, {useState} from 'react';
import styles from "../common/Modal.module.css";
import ButtonOutline from "../../../common/button/ButtonOutline";
import {useDispatch, useSelector} from "react-redux";
import {approvalAPI, rejectAPI} from "../../../../apis/ApprovalAPICalls";
import {getDocumentDetailAPI} from "../../../../apis/DocumentAPICalls";

function CreditModal({documentId, doctitle, title, content, isOpen, onClose}) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const approvalData = useSelector(state => state.approvalReducer);

  const fetchData = {
    documentCode : documentId,
    comment:comment
  }

  const handleApproval = () => {
    dispatch(approvalAPI({fetchData}));
    onClose();
  };

  const handleRejection = () => {
    dispatch(rejectAPI(fetchData));
    onClose();
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleConfirm = () => {
    if(title === '결재'){
      handleApproval();
    }else if(title === '반려'){
      handleRejection();
    }
  };

  const clear = ()=>{
    setComment('');
    onClose();
  }

  const style = {
    marginLeft: '8px',
    padding: '8px 15px',
    fontWeight: '700'
  }

  return (
      <>
        <div className={`${styles.container} ${isOpen ? '' : styles.none}`}>
          <div className={`${styles.modal} ${styles.modal_downsize}`}>
            <span className={`material-symbols-outlined ${styles.close}`} onClick={clear}>close</span>
            <div className={styles.content_wrapper}>
              <h2 className={styles.title}>{title}하기</h2>
              <div style={{flex:'1'}}>
                <div className={styles.title}>
                  <span>{title}문서명 : </span>
                  <span>{doctitle}</span>
                </div>
                <div className={styles.title}>
                  <p >
                    {title}의견
                  </p>
                  <textarea
                      className={styles.textarea}
                      placeholder={content}
                      name="comment"
                      id="comment"
                      cols="30"
                      rows="10"
                      onChange={handleCommentChange}
                  >
                  </textarea>
                </div>
              </div>
              <div className={styles.button}>
                <ButtonOutline style={style} value="확인" onClick={handleConfirm}/>
                <ButtonOutline style={style} value="취소" onClick={clear}/>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default CreditModal;