import React from 'react';
import style from "../../../../pages/approval/DocumentMain.module.css";

function PaymentSpan({paymentList}) {
  console.log(paymentList)
  return (
      <tr>
        <td className={style.td}>
          <span>
            {paymentList.paymentDate}
          </span>
        </td>
        <td className={style.td}>
          <span>
            {paymentList.paymentSort}
          </span>
        </td>
        <td className={style.td}>
          <span>
            {paymentList.paymentPrice}
          </span>
        </td>
        <td className={style.td}>
          <span>
            {paymentList.paymentContent}
          </span>
        </td>
        <td className={style.td}>
          <span>
            {paymentList.remarks}
          </span>
        </td>
      </tr>
  );
}

export default PaymentSpan;