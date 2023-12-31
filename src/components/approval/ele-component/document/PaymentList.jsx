import React from 'react';
import style from "../../../../pages/approval/DocumentMain.module.css";

export function PaymentList({key, payment, onUpdate }) {

  return (
      <tr key={key}>
        <td className={style.td}>
          <input
              className={style.input}
              type="date"
              value={payment.paymentDate || ''}
              onChange={(e) => onUpdate('paymentDate', e.target.value)}
          />
        </td>
        <td className={style.td}>
          <select
              className={style.input}
              value={payment.paymentSort || ''}
              onChange={(e) => onUpdate('paymentSort', e.target.value)} >
            <option value=""></option>
            <option value="물품구입비">물품구입비</option>
            <option value="식비">식비</option>
            <option value="교통비">교통비</option>
            <option value="기타">기타</option>
          </select>
        </td>
        <td className={style.td}>
          <input
            className={style.input}
            type="number"
            value={payment.paymentPrice || ''}
            onChange={(e) => {
              onUpdate('paymentPrice', e.target.value);
            }}
          />
        </td>
        <td className={style.td}>
          <input
              className={style.input}
              type="text"
              value={payment.paymentContent || ''}
              onChange={(e) => onUpdate('paymentContent', e.target.value)}
          />
        </td>
        <td className={style.td}>
          <input
              className={style.input}
              type="text"
              value={payment.remarks || ''}
              onChange={(e) => onUpdate('remarks', e.target.value)}
          />
        </td>
      </tr>
  );
}

export default PaymentList;
