import React from 'react';
import DocButtons from "../common/DocButtons";
import InsertButton from "../buttons/InsertButton";
import {useNavigate} from "react-router-dom";
import style from '../../../../pages/approval/DocumentMain.module.css';
import DocumentSide from "./DocumentSide";
function Draft() {
  const navigate = useNavigate();

  const handleRequest = () => {};
  const handleTemp = () => {};
  const handleChoice =() => {};
  const handleCancel = () => navigate("/approval");

  const url = {
    request: handleRequest,
    temp: handleTemp,
    cancel: handleCancel,
    choice: handleChoice
  }

  return (
      <>
        <DocButtons button={<InsertButton url={url}/>}/>
        <div className={style.container}>
          <div className={style.docs}>
            <div className={style.doc}>
              <h2 className={style.doc_title}>업무기안</h2>
              <div className={style.doc_top}>
                <table className={style.top_table}>
                  <colgroup>
                    <col width="100"/>
                    <col width="150"/>
                  </colgroup>
                  <tbody>
                  <tr className={style.tr}>
                    <td className={style.td}>기안자</td>
                    <td className={style.td} >주진선</td>
                  </tr>
                  <tr className={style.tr}>
                    <td className={style.td}>소속부서</td>
                    <td className={style.td}>개발팀</td>
                  </tr>
                  <tr className={style.tr}>
                    <td className={style.td}>기안일</td>
                    <td className={style.td}>2023-08-08</td>
                  </tr>
                  <tr className={style.tr}>
                    <td className={style.td}>문서번호</td>
                    <td className={style.td}></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <aside className={style.doc_side}>
            <DocumentSide/>
          </aside>
        </div>
      </>
  );
}

export default Draft;
