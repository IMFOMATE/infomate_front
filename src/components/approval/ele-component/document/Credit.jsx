import React from 'react';
import style from "./Credit.module.css";
import {formatApprovalDate} from "../common/dataUtils";
function Credit({key, text, rank, approvalDate}) {
  const formattedDate = approvalDate ? formatApprovalDate(approvalDate) : null;

  return (
      <div key={key} className={style.credit} >
        <p>{rank }</p>
        <p className={style.credit_name}>
          {
             // <img className={style.stamp} src="/img/user.jpg" />
          }
          <span>{text}</span>
        </p>
        <p>{
            formattedDate
          }
        </p>
      </div>
  );
}



export default Credit;