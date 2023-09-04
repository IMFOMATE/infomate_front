import React from 'react';
import mainCss from "../../components/common/main.module.css";
import {useLocation, useParams} from "react-router-dom";
import Payment from "../../components/approval/ele-component/document/Payment";
import Vacation from "../../components/approval/ele-component/document/Vacation";
import Draft from "../../components/approval/ele-component/document/Draft";
import styles from './DocumentMain.module.css';
import {DraftDataProvider} from "../../context/approval/DraftDataContext";
import {PaymentDataProvider} from "../../context/approval/PaymentDataContext";
import {VacationProvider} from "../../context/approval/VacationDataContext";
import DocumentHeader from "../../components/approval/manage/DocumentHeader";

function DocumentMain() {

  const location = useLocation();
  const {name, type, documentData} = location.state || {};

  console.log(documentData)

  const title = {
    draft: "업무기안",
    payment: "지출결의서",
    vacation: "휴가신청서"
  }

  console.log(type)
  return (
      <>
        <DocumentHeader name={name || title[type]}/>
        <div className={styles.doc_wrapper}>
          {
              (type === 'payment' && <PaymentDataProvider><Payment /></PaymentDataProvider>) ||
              (type === 'draft' && <DraftDataProvider><Draft data={documentData}/></DraftDataProvider>) ||
              (type === 'vacation' && <VacationProvider><Vacation/></VacationProvider>)
          }
        </div>
      </>
  );
}

export default DocumentMain;