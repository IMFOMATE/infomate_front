import React from 'react';
import ApprovalTopCss from './ApprobalTop.module.css';
import CreditList from "./CreditList";
function ApprovalTop({data}) {
  /* CreditList 개수 state 관리*/

  return (
    <section className={ApprovalTopCss.approval}>
      <CreditList data={data}/>
    </section>
  );
}

export default ApprovalTop;