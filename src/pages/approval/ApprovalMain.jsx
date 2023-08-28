import React, {useEffect, useState} from 'react';
import mainCss from '../../components/common/main.module.css';
import ApprovalTop from "../../components/approval/ApprovalTop";
import ApprovalTable from "../../components/approval/ele-component/table/ApprovalTable";
import {useDispatch, useSelector} from "react-redux";
import {getMainAPI} from "../../apis/DocumentAPICalls";

const ApprovalMain = () => {

  const dispatch = useDispatch();
  const documentData = useSelector(state => state.documentsReducer);
  const [ data, setData ] = useState(documentData);


  useEffect(() => {
        dispatch(getMainAPI({memberCode:2}));
        console.log(documentData)
        setData(documentData);
      },
      [data]
  );
  console.log(data)


  return (
    <>
      <div className={mainCss.maintitle}>
        <h2>전자결재 홈</h2>
      </div>
        <ApprovalTop data={documentData.creditList}/>
        <ApprovalTable title='기안문서' data={documentData.approvalList}/>
        <ApprovalTable title='참조문서' data={documentData.refList}/>
    </>
  );
};

export default ApprovalMain;