import React from 'react';
import {useLocation} from "react-router-dom";
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


  const title = {
    draft: "업무기안",
    payment: "지출결의서",
    vacation: "휴가신청서"
  }

  console.log("DocumentData in DocumentMain:", documentData);
  return (
      <>
        <DocumentHeader name={name || title[type]}/>
        <div className={styles.doc_wrapper}>
          {
              (type === 'payment' && <PaymentDataProvider><Payment documentData={documentData} /></PaymentDataProvider>) ||
              (type === 'draft' && <DraftDataProvider><Draft documentData={documentData}/></DraftDataProvider>) ||
              (type === 'vacation' && <VacationProvider><Vacation documentData={documentData}/></VacationProvider>)
          }
        </div>
      </>
  );
}

export default DocumentMain;