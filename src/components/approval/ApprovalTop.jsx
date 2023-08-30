import React, {useEffect, useState} from 'react';
import ApprovalTopCss from './ApprobalTop.module.css';
import CreditList from "./ele-component/list/CreditList";
function ApprovalTop({data}) {


  return (
    <section className={ApprovalTopCss.approval}>
      <CreditList data={data}/>
    </section>
  );
}

export default ApprovalTop;