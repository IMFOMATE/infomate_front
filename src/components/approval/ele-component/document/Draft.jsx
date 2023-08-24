import React, {useEffect, useState} from 'react';
import DocButtons from "../common/DocButtons";
import InsertButton from "../buttons/InsertButton";
import {useLocation, useNavigate} from "react-router-dom";
import style from '../../../../pages/approval/DocumentMain.module.css';
import DocumentSide from "./DocumentSide";
import ReactQuill from "react-quill";
import WriterInfo from "./WriterInfo";
import ApprovalModal from "../modal/ApprovalModal";


function Draft() {
  const navigate = useNavigate();
  const location = useLocation();
  const {name, type} = location.state;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  //아마 모달이 열릴때....... 조직도를 가져오도록해야할껄
  useEffect(()=>{
    if (isModalOpen){

    }
  },[isModalOpen]);


  const toggleModal = () => setIsModalOpen(prev => !prev);

  const handleRequest = () => {}; // 결제 완료 api 요청
  const handleTemp = () => {}; // 임시저장 api
  
  const handleChoice = toggleModal;  //결재선 지정 모달
  const handleCancel = () => navigate("/approval"); // 결제 취소

  //현재 문서작성자 -> 로컬스토리지에서 가져오기
  const writer= {
    name : '주진선',
    dept : '개발부서',
    date : `${new Date().toISOString().substring(0,10)}`
  }

  const data = {
    writer,
    refList:[],
    approvalList:[],
    fileList:[],
  };

  //버튼에 함수 넘겨주기
  const url = {
    request: handleRequest,
    temp: handleTemp,
    cancel: handleCancel,
    choice: handleChoice
  }

  return (
      <>
        {
          isModalOpen && <ApprovalModal modalData={modalData} toggleModal={toggleModal}/>
        }
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
