import React, {useEffect, useState} from 'react';
import mainCss from '../../components/common/main.module.css';
import ApprovalTop from "../../components/approval/ApprovalTop";
import ApprovalTable from "../../components/approval/ele-component/table/ApprovalTable";
import {useDispatch, useSelector} from "react-redux";
import {getMainAPI} from "../../apis/DocumentAPICalls";
import {LoadingSpiner} from "../../components/common/other/LoadingSpiner";
import {GET_DOCUMENT_MAIN} from "../../modules/approval/DocumentModuels";


const ApprovalMain = () => {

  const dispatch = useDispatch();
  const documentData = useSelector(state => state.documentsReducer[GET_DOCUMENT_MAIN]);
  const data = documentData?.data;


  useEffect(() => {
        dispatch(getMainAPI());
      },[]
  );

  console.log(documentData)

  if(documentData === null)  return <LoadingSpiner />

  return (
      <>
        <div className={mainCss.maintitle}>
          <h2>전자결재 홈</h2>
        </div>
          <>
            <div className={mainCss.approval_border}>
              <ApprovalTop data={data?.creditList} />
            </div>
            <ApprovalTable title="기안문서" data={data?.approvalList} />
            <ApprovalTable title="참조문서" data={data?.refList} />
          </>
      </>
  );
};

export default ApprovalMain;