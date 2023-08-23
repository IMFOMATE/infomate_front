import React from 'react';
import DocButtons from "../common/DocButtons";
import InsertButton from "../buttons/InsertButton";
import {useLocation, useNavigate} from "react-router-dom";
import style from '../../../../pages/approval/DocumentMain.module.css';
import DocumentSide from "./DocumentSide";
import ReactQuill from "react-quill";
import WriterInfo from "./WriterInfo";


function Draft() {
  const navigate = useNavigate();
  const location = useLocation();
  const {name, type} = location.state;
  console.log(type);

  const handleRequest = () => {}; // 결제 완료 api 요청
  const handleTemp = () => {}; // 임시저장 api
  const handleChoice =() => {};  //결재선 지정
  const handleCancel = () => navigate("/approval"); // 결제 취소

  //현재 문서작성자 -> 로컬스토리지로 가져오기
  const writer= {
    name : '주진선',
    dept : '개발부서',
    date : `${new Date().toISOString().substring(0,10)}`
  }

  //버튼에 함수 넘겨주기
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
              <h2 className={style.doc_title}>{name}</h2>
              <div className={style.doc_top}>
                <WriterInfo writer={writer}/>
                <div className={style.inline}>
                  {/*컴포넌트로 뜯어야함*/}
                  <div className={style.credit} >
                    <p>직위</p>
                    <p className={style.credit_name}>
                      <img className={style.stamp} src="/img/user.jpg" />
                        <span>주진선</span>
                    </p>
                    <p>날짜</p>
                  </div>
                </div>
              </div>
              <div className={style.doc_content}>
                {/*이것도 컴포넌트로........*/}
                <table className={style.top_table}>
                  <tbody>
                  <tr className={style.tr}>
                    <td className={style.td}>시행일자</td>
                    <td className={style.td}>
                      <input type="date"/>
                    </td>
                    <td className={style.tds}>
                      협조부서
                    </td>
                    <td className={style.td}>
                      <select className={style.dept}>
                        <option value="협조부서선택">협조부서선택</option>
                        <option value="경영팀">경영팀</option>
                        <option value="개발팀">개발팀</option>
                        <option value="지원팀">지원팀</option>
                      </select>
                    </td>
                  </tr>
                  <tr className={style.tr}>
                    <td className={style.td}>제목</td>
                    <td className={style.td}>
                      <input type="text" name="" id="" placeholder="제목을 입력해주세요"/>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <ReactQuill/>
              </div>
              {/* 파일컴포넌트 */}
              <div className={style.files}>
                <label htmlFor="docFile">파일 첨부</label>
                <input className={style.fileBtn} id="docFile" type="file" multiple />
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
