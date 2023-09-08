import React, {forwardRef} from 'react';
import style from "../../../../../pages/approval/DocumentMain.module.css";
import WriterInfo from "../WriterInfo";
import Credit from "../Credit";
import DocFile, {DocFileSpan} from "../../common/DocFile";
import DocumentSide from "../DocumentSide";
import {formatApprovalDate} from "../../common/dataUtils";

const VacationDetail = forwardRef(({data}, ref) =>{

  return (
      <div className={style.container}>
        <div className={style.docs} ref={ref}>
          <div className={style.doc}>
            <h2 className={style.doc_title}>{data.title}</h2>
            <div className={style.doc_top}>
              <WriterInfo writer={data.member} id={data.id} start={data.createdDate}/>
              <div className={style.inline}>
                {
                  data.approvalList.length !== 0 ?
                      data.approvalList.map((data, index) => <Credit key={index} text={data.memberName} rank={data.rankName} approvalDate={data?.approvalDate} approvalStatus={data.approvalStatus} />)
                      : ""
                }
              </div>
            </div>
            <div className={style.doc_content}>
              <table className={`${style.top_table} ${style.doc_content}`}>
                <tbody>
                <tr className={style.none}>
                  <td>
                    <span>
                      {data.title}
                    </span>
                    {/*<input name='title' value={name} type="text"/>*/}
                  </td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>작성일자</td>
                  <td className={style.td}>
                    <span>{formatApprovalDate(data.createdDate)}</span>
                    {/*<input name="startDate" type="date" className={style.input} onChange={onChangeHandler}/>*/}
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
                  <td className={style.td}>휴가종류</td>
                  <td className={style.td} colSpan={3}>
                    <span>
                      {data.sort}
                    </span>
                    {/*<select className={style.input} name='sort' onChange={onChangeHandler}>*/}
                    {/*  <option value="연차">연차</option>*/}
                    {/*  <option value="오전반차">오전반차</option>*/}
                    {/*  <option value="오후반차">오후반차</option>*/}
                    {/*</select>*/}
                  </td>
                </tr>
                <tr>
                  <td className={style.tds}>기간</td>
                  <td colSpan={3} className={style.td}>
                    {/*<input className={style.td} name='startDate' type="date" onChange={onStartDateChange} />*/}
                    <span>{data.startDate}</span>
                    <span> ~ </span>
                    <span>{data.endDate}</span>
                    <span>
                      {/*{*/}
                      {/*  new Date(data.endDate) - new Date(data.startDate)/ (1000 * 60 * 60 * 24) + 1*/}
                      {/*} 일*/}
                      </span>
                  </td>
                </tr>
                <tr>
                  <td className={style.tds}>휴가 사유</td>
                  <td colSpan={3}>
                    <textarea
                        disabled
                        className={style.textarea}
                        name="content"
                        id="reason"
                        cols="30" rows="10"
                        value={data.content}
                    />
                  </td>
                </tr>

                </tbody>
              </table>
            </div>
            {/* 파일컴포넌트 */}
            {/*<DocFile handleFileChange={handleFileChange}/>*/}
            <DocFileSpan fileList={data.fileList}/>
          </div>
        </div>
        <aside className={style.doc_side}>
          <DocumentSide approval={data.approvalList} reference={data.refList}/>
        </aside>
      </div>

  );
});

export default VacationDetail;
