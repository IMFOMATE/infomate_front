import React from 'react';
import CreditListCss from './CreditList.module.css'

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
      <a href="infomate_front/src/components/approval" className={CreditListCss.go}>결재하기</a>
    </div>)
  );
}

export default CreditList;