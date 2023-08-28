import React from 'react';
import ApprovalTableCss from "./ApprovalTable.module.css";

function TrData({list}) {
  return (
    <tr className={ApprovalTableCss.list_tr} key={list.id}>
      <td className={ApprovalTableCss.list_td}>{`문서번호-${list.id}`}</td>
      <td className={`${ApprovalTableCss.list_td} ${ApprovalTableCss.isAlert}`}>{`${list.isAlert === 'Y' ? '긴급' : '' }`}</td>
      <td className={ApprovalTableCss.list_td}>{list.status}</td>
      <td className={`${ApprovalTableCss.list_td} ${ApprovalTableCss.t_title}`}>{list.title}</td>
      <td className={`${ApprovalTableCss.list_td} ${ApprovalTableCss.last}`}>{list.createdDate}</td>
    </tr>
  );
}

export default TrData;