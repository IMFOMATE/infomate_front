import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import mainCss from "../../../../common/main.module.css";
import styles from '../../../../../pages/approval/DocumentMain.module.css';
import DraftDetail from "./DraftDetail";
import VacationDetail from "./VacationDetail";
import PaymentDetail from "./PaymentDetail";
import {useDispatch, useSelector} from "react-redux";
import {deleteDocumentAPI, getDocumentDetailAPI} from "../../../../../apis/DocumentAPICalls";
import { FadeLoader } from "react-spinners";
import loadingCss from '../../../../../pages/calendar/loadingStyle.module.css';
import DetailButton from "../../buttons/DetailButton";
import CreditModal from "../../modal/CreditModal";
import {POST_APPROVE, POST_REJECT, POST_TEMP} from "../../../../../modules/approval/ApprovalModuels";
import {DELETE_DOCUMENT, GET_DETAIL} from "../../../../../modules/approval/DocumentModuels";
import {handleDelete} from "../../common/dataUtils";
import {useReactToPrint} from "react-to-print";

function DocumentDetail() {
  let { documentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state?.state;
  const documentData = useSelector(state => state.documentsReducer[GET_DETAIL]);
  const deleteData = useSelector(state => state.documentsReducer[DELETE_DOCUMENT]);
  const approvalReducer = useSelector(state => state.approvalReducer);
  const ref = useRef();

  console.log("state", state);

  const [modalData, setModalData] = useState({
    isOpen: false,
    title: '',
    content: '',
  });

  useEffect(
      ()=>{
        dispatch(getDocumentDetailAPI({documentCode: documentId}));
      },
      [
          approvalReducer[POST_REJECT],
          approvalReducer[POST_APPROVE],
          approvalReducer[POST_TEMP],
      ]
  );


  const handleApproval = (title, content) => {
    setModalData({
      isOpen: !modalData.isOpen,
      title: title,
      content: content,
    });
  };

  const handleCloseModal = () => {
    // 모달 데이터 업데이트
    setModalData({
      ...modalData,
      title:'',
      isOpen: false,
    });
  };

  const reApprove = () => {

    navigate(`/approval/document/${documentId}/reapply`,{
      state:{
        name: '',
        type: documentData.documentKind.toLowerCase(),
        documentData: documentData
      }
    });
  };




  const deleteDocument = () => {
    dispatch(deleteDocumentAPI({documentCode: documentId}));
    navigate('/approval');

  }

  // 문서 종류별 세부 컴포넌트를 매핑하는 객체
  const documentComponents = {
    Draft: <DraftDetail data={documentData} ref={ref}/>,
    vacation: <VacationDetail data={documentData} ref={ref}/>,
    payment: <PaymentDetail data={documentData} ref={ref}/>,
  };

  const selectedComponent = documentComponents[documentData?.documentKind];


  //임시저장상태면 input 태그여야하니까
  if(documentData?.documentStatus === "TEMPORARY"){

  }


  return (
      <>
        {!documentData && (
            <div className={loadingCss.loading}>
              <FadeLoader color="#9F8AFB" />
            </div>
        )}

        {documentData && (
            <>
              <div className={mainCss.maintitle}>
                <h2>{documentData.title}</h2>
              </div>
              <div className={styles.doc_wrapper}>
                  <DetailButton
                      condition={documentData.condition}
                      isOpen={handleApproval}
                      reapply={reApprove}
                      deleteDoc={()=> handleDelete(deleteDocument)}
                      ref={ref}
                  />
                {selectedComponent}
              </div>
              {modalData.isOpen && (
                  /* 모달 이름, 종료시, */
                  <CreditModal
                      documentId={documentData.id}
                      doctitle={documentData.title}
                      title={modalData.title}
                      content={modalData.content}
                      isOpen={modalData.isOpen}
                      onClose={handleCloseModal}
                  />
              )}
            </>
        )}
      </>
  );
}

export default DocumentDetail;