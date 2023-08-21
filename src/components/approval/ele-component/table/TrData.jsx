import React from 'react';
import ApprovalTableCss from "./ApprovalTable.module.css";

function TrData({list}) {
  return (
    <tr key={list.no}>
      <td>{`문서번호-${list.no}`}</td>
      <td className={ApprovalTableCss.isAlert}>{`${list.isAlert ? '긴급' : '' }`}</td>
      <td>{list.status}</td>
      <td className={ApprovalTableCss.t_title}>{list.docTitle}</td>
      <td>{list.createDate}</td>
    </tr>
  );
}

export default TrData;