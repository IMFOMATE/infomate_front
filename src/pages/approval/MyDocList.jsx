import React from 'react';
import ToolbarApprovalTable from "../../components/approval/ele-component/table/toolbarApprovalTable";
import style from '../../components/common/main.module.css'

function MyDocList({title}) {

  /*여기서 url에 따라 다른 fetch가 일어나게하고
  * ToolbarApprovalTable에 넘어온 값을 넘겨주자 */


  return (
    <>
      <div className={style.maintitle}>
        <h2>
          {title}
        </h2>
      </div>
      <ToolbarApprovalTable />
    </>
  );
}



export default MyDocList;

