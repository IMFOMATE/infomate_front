import React from 'react';
import mainCss from "../../components/common/main.module.css";
import {useLocation} from "react-router-dom";
import Payment from "../../components/approval/ele-component/document/Payment";
import Vacation from "../../components/approval/ele-component/document/Vacation";
import Draft from "../../components/approval/ele-component/document/Draft";
import styles from './DocumentMain.module.css';

function DocumentMain() {
  const location = useLocation();
  const {name, type} = location.state;
  return (
      <>
        <div className={mainCss.maintitle}>
          <h2>{name}</h2>
        </div>
        <div className={styles.doc_wrapper}>
          {
              (type === 'payment' && <Payment/>) ||
              (type === 'draft' && <Draft/>) ||
              (type === 'vacation' && <Vacation/>)
          }
        </div>
      </>
  );
}

export default DocumentMain;