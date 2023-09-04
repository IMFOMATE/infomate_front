import React from 'react';
import ApprovalTableCss from './ApprovalTable.module.css';
import TrData from "./TrData";
import loadingCss from "../../../../pages/calendar/loadingStyle.module.css";
import { FadeLoader } from "react-spinners";

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

  if(!data || !Array.isArray(data)){
    return (
        <div className={loadingCss.loading}>
          <FadeLoader color="#9F8AFB" />
        </div>
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
            data.length === 0 ?
                <tr>
                  <td className={ApprovalTableCss.data_null} colSpan={5}>해당 문서가 없습니다</td>
                </tr>
                :
              data?.map((list, index)=> <TrData key={index} list={list}/>)
          }
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ApprovalTable;
