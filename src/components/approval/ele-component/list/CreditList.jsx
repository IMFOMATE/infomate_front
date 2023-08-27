import React from 'react';
import CreditListCss from './CreditList.module.css'
import {Link} from "react-router-dom";

function CreditList({data}) {

  return (
    data.map(d =>
    <div key={d.num} className={CreditListCss.approvalList}>
      <div className={CreditListCss.content}>
        <div>
          {d.isAlert ?
            <span className={CreditListCss.alert}>
            긴급
            </span>
            : ''
          }
          <span className={CreditListCss.status}>{d.status}</span>
        </div>
        <p className={CreditListCss.docNum}>{`문서번호-${d.num}`}</p>
        <h2 className={CreditListCss.title}>{d.docTitle}</h2>
        <div className={CreditListCss.subContent}>
          <p className={CreditListCss.date}>{d.createDate}</p>
          <p>{`기안자 ${d.writer}`}</p>
        </div>
      </div>
      <Link className={CreditListCss.go} to={`document/${d.num}`}>
        결재하기
      </Link>
    </div>)
  );
}

export default CreditList;