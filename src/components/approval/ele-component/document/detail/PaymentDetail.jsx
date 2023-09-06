import React, {forwardRef} from 'react';
import style from "../../../../../pages/approval/DocumentMain.module.css";
import WriterInfo from "../WriterInfo";
import Credit from "../Credit";
import {formatApprovalDate, formatNumberWithCommas} from "../../common/dataUtils";
import DocFile, {DocFileSpan} from "../../common/DocFile";
import DocumentSide from "../DocumentSide";
import PaymentSpan from "../PaymentSpan";

const PaymentDetail = forwardRef(({data}, ref) =>{
  const calculateTotal = () => {
    const totalPaymentPrice = data.paymentList.reduce((total, payment) => {
      return parseInt(total) + parseInt(payment.paymentPrice);
    }, 0);
    return Math.floor(totalPaymentPrice);
  }

  return (
      <div className={style.container}>
        <div className={style.docs} ref={ref}>
          <div className={style.doc}>
            <h2 className={style.doc_title}>지출결의서</h2>
            <div className={style.doc_top}>
              <WriterInfo writer={data.member} id={data.id} start={data.createdDate}/>
              <div className={style.inline}>
                {
                  data.approvalList.length !== 0 ?
                  data.approvalList.map((data, i) => <Credit key={data.memberCode} text={data.memberName} rank={data.rankName} approvalDate={data.approvalDate} approvalStatus={data.approvalStatus}/>)
                      : ""
                }
              </div>
            </div>
            <div className={style.doc_content}>
              {/*이것도 컴포넌트로........*/}
              <table className={`${style.top_table} ${style.doc_content}`}>
                <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>작성일자</td>
                  <td className={style.td}>
                    <span>{formatApprovalDate(data.createdDate)}</span>
                  </td>
                  <td className={`${style.tds} ${style.td}`} >긴급여부</td>
                  <td className={style.td} >
                    <input
                        disabled
                        className={style.left}
                        name='emergency'
                        type="checkbox"
                        checked={data.emergency === 'Y'}
                        value={data.emergency === 'Y'}
                    />
                  </td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>제목</td>
                  <td className={style.td} >
                    <span>{data.title}</span>
                  </td>
                  <td className={style.tds}>
                    총금액
                  </td>
                  <td className={style.td}>
                    {formatNumberWithCommas(calculateTotal().toString()) || ''}원
                  </td>
                </tr>
                <tr>
                  <td className={style.tds}>지출사유</td>
                  <td colSpan={3}>
                    <textarea
                        className={style.textarea}
                        name="content" cols="30" rows="10"
                        value={data.content || ''}
                    />
                  </td>
                </tr>
                </tbody>
              </table>

              <div>
                <div className={style.button}>
                  {/*<ButtonInline onClick={addRow} value='추가' style={{marginRight:'10px'}}/>*/}
                  {/*<ButtonInline onClick={removeRow} value='삭제'/>*/}
                </div>
                <table className={style.top_table}>
                  <thead>
                  <tr className={`${style.tds} ${style.tr}`}>
                    <td  className={style.td}>지출일자</td>
                    <td className={style.td}>종류</td>
                    <td className={style.td}>금액</td>
                    <td className={style.td}>내용</td>
                    <td className={style.td}>비고</td>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    data.paymentList.map((value, index)=>
                        <PaymentSpan paymentList={value}/>
                    )
                  }
                  </tbody>
                  <tfoot>
                  <tr>
                    <td colSpan="1" className={style.sum}></td>
                    <td className={style.sum}>합계 : </td>
                    <td colSpan="1">{formatNumberWithCommas(calculateTotal().toString()) || ''}원</td>
                  </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            {/* 파일컴포넌트 */}
            <DocFileSpan fileList={data.fileList}/>
          </div>
        </div>
        <aside className={style.doc_side}>
          <DocumentSide approval={data.approvalList} reference={data.refList}/>
        </aside>
      </div>
  );
});

export default PaymentDetail;