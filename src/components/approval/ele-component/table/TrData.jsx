import React from 'react';
import ApprovalTableCss from "./ApprovalTable.module.css";

function TrData({list}) {
  return (
    <tr className={ApprovalTableCss.list_tr} key={list.no}>
      <td className={ApprovalTableCss.list_td}>{`문서번호-${list.no}`}</td>
      <td className={`${ApprovalTableCss.list_td} ${ApprovalTableCss.isAlert}`}>{`${list.isAlert ? '긴급' : '' }`}</td>
      <td className={ApprovalTableCss.list_td}>{list.status}</td>
      <td className={`${ApprovalTableCss.list_td} ${ApprovalTableCss.t_title}`}>{list.docTitle}</td>
      <td className={`${ApprovalTableCss.list_td} ${ApprovalTableCss.last}`}>{list.createDate}</td>
    </tr>
  );
}

export default TrData;