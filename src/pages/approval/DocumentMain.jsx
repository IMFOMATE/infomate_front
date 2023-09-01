import React from 'react';
import mainCss from "../../components/common/main.module.css";
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
  const {name, type} = location.state;
  return (
      <>
        <DocumentHeader name={name}/>
        <div className={styles.doc_wrapper}>
          {
              (type === 'payment' && <PaymentDataProvider><Payment /></PaymentDataProvider>) ||
              (type === 'draft' && <DraftDataProvider><Draft/></DraftDataProvider>) ||
              (type === 'vacation' && <VacationProvider><Vacation/></VacationProvider>)
          }
        </div>
      </>
  );
}

export default DocumentMain;