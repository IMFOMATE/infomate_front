import React from 'react';
import mainCss from '../../../common/main.css'
import ApprovalTableCss from './ApprovalTable.module.css';
import TrData from "./TrData";

function TableHeader(){
  return(
    <>
      <colgroup>
        <col width="15%"/>
        <col width="15%"/>
        <col width="15%"/>
        <col width="200px"/>
        <col width="15%"/>
      </colgroup>
      <thead>
      <tr>
        <th className={ApprovalTableCss.list_no}>문서번호</th>
        <th>긴급여부</th>
        <th>결재상태</th>
        <th className={ApprovalTableCss.t_title}>제목</th>
        <th>기안날짜</th>
      </tr>
      </thead>
    </>
  );
}


function ApprovalTable({title, data}) {

  if(data.length < 1){
    return (
      <>
        <table className={ApprovalTableCss.list_approval}>
          <TableHeader/>
        </table>
        <div className={ApprovalTableCss.nolist}>해당문서가 없습니다.</div>
      </>
    );
  }

  return (
    <div>
      {
        title && <h2 className='subtitle'>{title}</h2>
      }
      <div>
        <table className={ApprovalTableCss.list_approval}>
          <TableHeader/>
          <tbody>
          {
            data.map((value, index) => <TrData key={index} list={value}/>)
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApprovalTable;
