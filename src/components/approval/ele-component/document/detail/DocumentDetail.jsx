import React, {useEffect} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import mainCss from "../../../../common/main.module.css";
import styles from '../../../../../pages/approval/DocumentMain.module.css';
import DraftDetail from "./DraftDetail";
import VacationDetail from "./VacationDetail";
import PaymentDetail from "./PaymentDetail";

const data = {
  "status": 200,
  "message": "success",
  "data": {
    "id": 22,
    "title": "협조부탁드립니다.",
    "createdDate": "2023-08-17 02:29:13",
    "documentStatus": "WAITING",
    "member": {
      "memberName": "DBTEST",
      "deptName": "본부"
    },
    "content": "이러한 내용으로 협조 부탁드립니다.",
    "documentKind": "Draft",
    "fileList": [],
    "approvalList": [],
    "refList": [
      {
        "memberName": "DBTEST2",
        "rankName": "사원"
      }
    ],
    "coDept": "경영지원",
    "startDate": null
  }
};

function DocumentDetail() {
  let { documentId } = useParams();
  const location = useLocation();

  // 데이터 요청 하고 불러오기
  const document = data.data;

  useEffect(
      ()=>{

      },
      []
  );


  // 문서 종류별 세부 컴포넌트를 매핑하는 객체
  const documentComponents = {
    Draft: <DraftDetail />,
    vacation: <VacationDetail />,
    payment: <PaymentDetail />,
    // 다른 종류의 문서에 대한 컴포넌트를 추가로 매핑
  };

  const selectedComponent = documentComponents[document.documentKind];

  return (
      <>
        <div className={mainCss.maintitle}>
          <h2>{document.title}</h2>
        </div>
        <div className={styles.doc_wrapper}>
          {selectedComponent}
        </div>
      </>
  );
}

export default DocumentDetail;