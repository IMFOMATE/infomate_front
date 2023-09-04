import React from 'react';
import style from "./Credit.module.css";
import {formatApprovalDate, shortFormatApprovalDate} from "../common/dataUtils";
function Credit({key, text, rank, approvalDate, approvalStatus}) {
  const formattedDate = approvalDate ? formatApprovalDate(approvalDate) : null;

  console.log(approvalStatus)
  return (
      <div key={key} className={style.credit} >
        <p>{rank }</p>
        <p className={style.credit_name}>
          {

            approvalStatus === 'APPROVAL' ?
                <img className={style.stamp} src="/img/stamp.png" />
                :
                ''
             // <img className={style.stamp} src="/img/user.jpg" />
          }
          <span>{text}</span>
        </p>
        <p className={approvalStatus === 'REJECT' ? style.reject :''}>
          {
            approvalStatus === 'REJECT' ? `(반려)${shortFormatApprovalDate(approvalDate)}` : formattedDate
          }
        </p>
      </div>
  );
}



export default Credit;