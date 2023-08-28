import React from 'react';
import style from "./Credit.module.css";
function Credit({key, approval}) {
  const {data, text, approvalDate} = approval;


  return (
      <div key={key} className={style.credit} >
        <p>{data.rank}</p>
        <p className={style.credit_name}>
          {
             // <img className={style.stamp} src="/img/user.jpg" />
          }

          <span>{text}</span>
        </p>
        <p>{approvalDate ?? ""}</p>
      </div>
  );
}

export default Credit;