import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import mainCss from "../../../../common/main.module.css";
import styles from '../../../../../pages/approval/DocumentMain.module.css';
import DraftDetail from "./DraftDetail";
import VacationDetail from "./VacationDetail";
import PaymentDetail from "./PaymentDetail";
import {useDispatch, useSelector} from "react-redux";
import {getDocumentDetailAPI} from "../../../../../apis/DocumentAPICalls";
import { FadeLoader } from "react-spinners";
import loadingCss from '../../../../../pages/calendar/loadingStyle.module.css';

function DocumentDetail() {
  let { documentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const documentData = useSelector(state => state.documentsReducer);


  useEffect(
      ()=>{
        dispatch(getDocumentDetailAPI({documentCode: documentId}));
      },
      []
  );




  // 문서 종류별 세부 컴포넌트를 매핑하는 객체
  const documentComponents = {
    Draft: <DraftDetail data={documentData}/>,
    vacation: <VacationDetail data={documentData} />,
    payment: <PaymentDetail data={documentData}/>,
  };

  const selectedComponent = documentComponents[documentData.documentKind];

  console.log(documentData.id)
  return (
      <>
        {!documentData.id && (
            <div className={loadingCss.loading}>
              <FadeLoader color="#9F8AFB" />
            </div>
        )}

        {/* Use documentData.id instead of documentId.id */}
        {documentData.id && (
            <>
              <div className={mainCss.maintitle}>
                <h2>{documentData.title}</h2>
              </div>
              <div className={styles.doc_wrapper}>
                <div>버튼들</div>
                {selectedComponent}
              </div>
            </>
        )}
      </>
  );
}

export default DocumentDetail;