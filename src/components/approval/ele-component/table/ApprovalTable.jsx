import React from 'react';
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
      <tr className={ApprovalTableCss.list_tr}>
        <th className={`${ApprovalTableCss.list_th} ${ApprovalTableCss.list_no}`}>문서번호</th>
        <th className={`${ApprovalTableCss.list_th}`}>긴급여부</th>
        <th className={`${ApprovalTableCss.list_th}`}>결재상태</th>
        <th className={`${ApprovalTableCss.list_th} ${ApprovalTableCss.t_title}`}>제목</th>
        <th className={`${ApprovalTableCss.list_th} ${ApprovalTableCss.last}`}>기안날짜</th>
      </tr>
      </thead>
    </>
  );
}


function ApprovalTable({title, data}) {

  if(data === null || []){
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
    <section>
      {
        title && <h2 className={ApprovalTableCss.subtitle}>{title}</h2>
      }
      <div className={ApprovalTableCss.container}>
        <table className={ApprovalTableCss.list_approval}>
          <TableHeader/>
          <tbody>
          {
            data.map((value, index) => <TrData key={index} list={value}/>)
          }
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ApprovalTable;
