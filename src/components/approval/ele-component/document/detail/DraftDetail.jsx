import React from 'react';
import style from "../../../../../pages/approval/DocumentMain.module.css";
import WriterInfo from "../WriterInfo";
import Credit from "../Credit";
import Editor from "../../common/Editor";
import DocFile, {DocFileSpan} from "../../common/DocFile";
import DocumentSide from "../DocumentSide";
import ReactQuill from "react-quill";
// import {formatApprovalDate} from "../../common/dataUtils";

function formatApprovalDate(approvalDate) {
  const date = new Date(approvalDate);
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
}
function DraftDetail({data}) {
  const { emergency, startDate, member, approvalList, fileList, refList, coDept,content,createdDate,documentKind,documentStatus, title} = data;
  const formattedDate = createdDate ? formatApprovalDate(createdDate) : null;


  return (
      <div className={style.container}>
        <div className={style.docs}>
          <div className={style.doc}>
            <h2 className={style.doc_title}>{title}</h2>
            <div className={style.doc_top}>
              <WriterInfo writer={member} id={data.id} start={createdDate}/>
              <div className={style.inline}>
                {
                  data.approvalList.length !== 0 ?
                      data.approvalList.map((data, i) => <Credit key={data.memberCode} text={data.memberName} rank={data.rankName} approvalDate={formattedDate} />)
                      : ""
                }
              </div>
            </div>
            <div className={style.doc_content}>
              {/*이것도 컴포넌트로........*/}
              <table className={style.top_table}>
                <tbody>
                <tr className={style.tr}>
                  <td className={style.td}>시행일자</td>
                  <td className={style.td}>
                    {/*<input name="startDate" type="date" className={style.input} onChange={onChangeHandler}/>*/}
                    <span>{`${startDate[0]}/${startDate[1]}/${startDate[2]}` ?? ''}</span>
                  </td>
                  <td className={style.tds}>
                    협조부서
                  </td>
                  <td className={style.td}>
                    <span>{coDept ?? ''}</span>
                    {/*<select onChange={onChangeHandler} name="coDept" className={style.dept}>*/}
                    {/*  <option value="협조부서선택">협조부서선택</option>*/}
                    {/*  <option value="경영팀">본부</option>*/}
                    {/*  <option value="개발팀">영업팀</option>*/}
                    {/*  <option value="지원팀">개발팀</option>*/}
                    {/*  <option value="경영팀">인사팀</option>*/}
                    {/*  <option value="개발팀">총무팀</option>*/}
                    {/*  <option value="지원팀">마케팅팀</option>*/}
                    {/*</select>*/}
                  </td>
                </tr>
                <tr className={style.tr}>
                  <td className={style.td}>제목</td>
                  <td className={style.td} >
                    <span>{title}</span>
                    {/*<input name="title" type="text" placeholder="제목을 입력해주세요" className={style.input} onChange={onChangeHandler}/>*/}
                  </td>
                  <td className={style.tds} >긴급여부</td>
                  <td className={style.td} >
                    <input
                        disabled
                        className={style.left}
                        name='emergency'
                        type="checkbox"
                        value={emergency === 'Y'}
                    />
                  </td>
                </tr>
                </tbody>
              </table>
              <ReactQuill value={content} readOnly={true} modules={{toolbar: false}}/>
            </div>
            <DocFileSpan fileList={fileList}/>
          </div>
        </div>
        <aside className={style.doc_side}>
          {/*<DocumentSide approval={approvalList} reference={refList}/>*/}
        </aside>
      </div>
  );
}

export default DraftDetail;