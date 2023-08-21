import React from 'react';
import ToolbarApprovalTable from "../../components/approval/ele-component/table/toolbarApprovalTable";

function MyDocList({title}) {

  /*여기서 url에 따라 다른 fetch가 일어나게하고
  * ToolbarApprovalTable에 넘어온 값을 넘겨주자 */


  return (
    <>
      <div className='maintitle'>
        <h1>
          {title}
        </h1>
      </div>
      <ToolbarApprovalTable />
    </>
  );
}



export default MyDocList;

