import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import mainCss from "../../../../common/main.module.css";
import styles from '../../../../../pages/approval/DocumentMain.module.css';
import DraftDetail from "./DraftDetail";
import VacationDetail from "./VacationDetail";
import PaymentDetail from "./PaymentDetail";
import {useDispatch, useSelector} from "react-redux";
import {cancelDocumentAPI, deleteDocumentAPI, getDocumentDetailAPI} from "../../../../../apis/DocumentAPICalls";
import { FadeLoader } from "react-spinners";
import loadingCss from '../../../../../pages/calendar/loadingStyle.module.css';
import DetailButton from "../../buttons/DetailButton";
import CreditModal from "../../modal/CreditModal";
import {POST_APPROVE, POST_REJECT, POST_TEMP} from "../../../../../modules/approval/ApprovalModuels";
import {CANCEL_DOCUMENT, DELETE_DOCUMENT, GET_DETAIL} from "../../../../../modules/approval/DocumentModuels";
import {handleAlert} from "../../common/dataUtils";
import {PaymentDataProvider} from "../../../../../context/approval/PaymentDataContext";
import Payment from "../Payment";
import Draft from "../Draft";
import {DraftDataProvider} from "../../../../../context/approval/DraftDataContext";
import {VacationProvider} from "../../../../../context/approval/VacationDataContext";
import Vacation from "../Vacation";
import DocumentHeader from "../../../manage/DocumentHeader";

function DocumentDetail() {
  let { documentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state?.state;
  const documentData = useSelector(state => state.documentsReducer[GET_DETAIL]);
  const documentReducer = useSelector(state => state.documentsReducer);
  const deleteData = useSelector(state => state.documentsReducer[DELETE_DOCUMENT]);
  const approvalReducer = useSelector(state => state.approvalReducer);
  const ref = useRef();


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
          documentReducer[CANCEL_DOCUMENT],
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

  //재기안
  const reApprove = () => {

    navigate(`/approval/document/${documentId}/reapply`,{
      state:{
        name: '',
        type: documentData.documentKind.toLowerCase(),
        documentData: documentData
      }
    });
  };

 //문서삭제
  const deleteDocument = () => {
    dispatch(deleteDocumentAPI({documentCode: documentId}));
    navigate('/approval');
  }

  //기안 취소
  const cancelDocument = () => {
    dispatch(cancelDocumentAPI({documentCode: documentId}));

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
    return (
        <>
          <DocumentHeader name={documentData?.title}/>
          {documentData.documentKind === 'payment' && <PaymentDataProvider><Payment documentData={documentData} temp={true}/></PaymentDataProvider>}
          {documentData.documentKind === 'Draft' && <DraftDataProvider><Draft documentData={documentData} temp={true} /></DraftDataProvider>}
          {documentData.documentKind === 'vacation' && <VacationProvider><Vacation documentData={documentData} temp={true}/></VacationProvider>}
        </>
    );
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
                      deleteDoc={()=> handleAlert("문서 삭제",'문서를 삭제하시겠습니까?', deleteDocument)}
                      cancel={()=> handleAlert("상신 취소",'결재문서를 취소하시겠습니까?', cancelDocument)}
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