import React from 'react';
import mainCss from '../../components/common/main.module.css';
import ApprovalTop from "../../components/approval/ApprovalTop";
import ApprovalTable from "../../components/approval/ele-component/table/ApprovalTable";
function ApprovalMain() {
  return (
    <>
      <div className={mainCss.maintitle}>
        <h1>전자결재 홈</h1>
      </div>
        <ApprovalTop data={testInit.creditList}/>
        <ApprovalTable title='기안문서' data={testInit.approvalList}/>
        <ApprovalTable title='참조문서' data={testInit.refList}/>
    </>
  );
}

const testInit = {
  creditList: [
    {
      num: '111',
      isAlert: true,
      status: 'WAITING',
      docTitle: '테스트 문서입니다.',
      createDate: '2023-08-08',
      writer: '주진선'
    },
    {
      num: '112',
      isAlert: false,
      status: 'WAITING',
      docTitle: '테스트 문서입니다.',
      createDate: '2023-08-08',
      writer: '주진선'
    }
  ],
  approvalList: [
    {
      no:'111',
      isAlert: true,
      status: 'WAITING',
      docTitle:'테스트 문서입니다.',
      createDate:'2023-08-08'
    },
    {
      no:'112',
      isAlert: true,
      status: 'WAITING',
      docTitle:'테스트 문서입니다.',
      createDate:'2023-08-08'
    },
    {
      no:'113',
      isAlert: true,
      status: 'WAITING',
      docTitle:'테스트 문서입니다.',
      createDate:'2023-08-08'
    },{
      no:'114',
      isAlert: true,
      status: 'WAITING',
      docTitle:'테스트 문서입니다.',
      createDate:'2023-08-08'
    },
    {
      no:'115',
      isAlert: true,
      status: 'WAITING',
      docTitle:'테스트 문서입니다.',
      createDate:'2023-08-08'
    }
  ],
  refList:[
    {
      no:'121',
      isAlert: true,
      status: 'WAITING',
      docTitle:'테스트 문서입니다.',
      createDate:'2023-08-08'
    },
    {
      no:'122',
      isAlert: true,
      status: 'WAITING',
      docTitle:'테스트 문서입니다.',
      createDate:'2023-08-08'
    },
    {
      no:'123',
      isAlert: true,
      status: 'WAITING',
      docTitle:'테스트 문서입니다.',
      createDate:'2023-08-08'
    },
    {
      no:'124',
      isAlert: true,
      status: 'WAITING',
      docTitle:'테스트 문서입니다.',
      createDate:'2023-08-08'
    },
    ,
    {
      no:'125',
      isAlert: true,
      status: 'WAITING',
      docTitle:'테스트 문서입니다.',
      createDate:'2023-08-08'
    }
  ]
}

export default ApprovalMain;