import React from 'react';
import ApprovalTableCss from "./ApprovalTable.module.css";
import {formatApprovalDate, formatStatus} from "../common/dataUtils";
import {Link} from "react-router-dom";
import Status from "./Status";

function TrData({list}) {
  return (
    <tr className={ApprovalTableCss.list_tr} key={list.id}>
      <td className={ApprovalTableCss.list_td}>{`문서번호-${list.id}`}</td>
      <td className={`${ApprovalTableCss.list_td} ${ApprovalTableCss.isAlert}`}>{`${list.isAlert === 'Y' ? '긴급' : '' }`}</td>
      <td className={ApprovalTableCss.list_td}>
        <Status status={list.status}/>
      </td>
      <td className={`${ApprovalTableCss.list_td} ${ApprovalTableCss.t_title}`}>
        <Link to={`/approval/document/${list.id}`}>{list.title}</Link>
      </td>
      <td className={`${ApprovalTableCss.list_td} ${ApprovalTableCss.last}`}>{formatApprovalDate(list.createdDate)}</td>
    </tr>
  );
}

export default TrData;