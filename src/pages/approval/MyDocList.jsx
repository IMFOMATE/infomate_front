import React from 'react';
import ToolbarApprovalTable from "../../components/approval/ele-component/table/toolbarApprovalTable";

function MyDocList(props) {

  return (
    <>
      <div className='maintitle'>
        <h1>
          내 기안문서
        </h1>
      </div>
      <ToolbarApprovalTable/>
    </>
  );
}



export default MyDocList;

