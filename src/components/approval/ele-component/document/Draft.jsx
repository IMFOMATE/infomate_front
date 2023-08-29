import React, {useEffect, useState} from 'react';
import DocButtons from "../common/DocButtons";
import InsertButton from "../buttons/InsertButton";
import {useLocation, useNavigate} from "react-router-dom";
import style from '../../../../pages/approval/DocumentMain.module.css';
import DocumentSide from "./DocumentSide";
import WriterInfo from "./WriterInfo";
import ApprovalModal from "../modal/ApprovalModal";
import Credit from "./Credit";
import Editor from "../common/Editor";
import DocFile from "../common/DocFile";
import {useDraftDataContext} from "../../../../context/approval/DraftDataContext";
import {treeviewAPI} from "../../../../apis/Department.API";
import {useDispatch, useSelector} from "react-redux";
import {draftRegistAPI} from "../../../../apis/DocumentAPICalls";


function Draft() {
  const treeview = useSelector(state => state.departmentReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {name} = location.state;
  const { data, setData } = useDraftDataContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(
      ()=>{
        dispatch(treeviewAPI());
      },
      []
  );

  // form 데이터
  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const checkboxHandler = (e) => {
    const newValue = e.target.checked ? 'Y' : 'N'; // 체크 여부에 따라 'Y' 또는 'N' 설정
    setData({
      ...data,
      [e.target.name]: newValue
    });
  };


  // 모달이 열릴 때 fetch GET 조직도 가지고옴 -> modalData
  useEffect(()=>{
    if (isModalOpen){

    }
  },[isModalOpen]);


  //모달 토글 버튼
  const toggleModal = () => setIsModalOpen(prev => !prev);

  //결제 요청 api
  const handleRequest = () => {
    console.log(data);

    // 여기서 폼작업 해줘야한다./
    const formData = new FormData();


    // const approvalListArray = data.approvalList.map((app, index) => ({ "id": app.data.memberCode, "order": index + 1 }));


    data.fileList.forEach((file) => {
      formData.append("fileList", file); // 각 파일을 formData에 추가
    });

    data.approvalList.forEach((app,index)=> {
      formData.append("approvalList", ({ "id": app.data.memberCode, "order": index + 1 }))
    })


    //
    // const refListArray = data.refList.map(ref => ({ "id": ref.data.memberCode }));
    // formData.append("refList", refListArray);

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("emergency", data.emergency ?? "N");
    formData.append("coDept", data.coDept);

    dispatch(draftRegistAPI({form: formData}));

    // 유효성 검사도 하자

  };

  // 임시저장 api
  const handleTemp = () => {};

  //
  const handleChoice = toggleModal;  //결재선 지정 모달
  const handleCancel = () => navigate("/approval"); // 결제 취소

  // 파일 저장
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setData({...data, fileList: newFiles});
  };


  //현재 문서작성자 -> 로컬스토리지에서 가져오기
  const writer= {
    memberName : '주진선',
    deptName : '개발부서',
    createdDate : `${new Date().toISOString().substring(0,10)}`
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
        {
          isModalOpen && <ApprovalModal contextType='draft' modalData={treeview} toggleModal={toggleModal}/>
        }
        <DocButtons button={<InsertButton url={url}/>}/>
        <div className={style.container}>
          <div className={style.docs}>
            <div className={style.doc}>
              <h2 className={style.doc_title}>{name}</h2>
              <div className={style.doc_top}>
                <WriterInfo writer={writer}/>
                <div className={style.inline}>
                  {
                    data.approvalList.length !== 0 ?
                        data.approvalList.map((data, index) => <Credit key={data.memberCode} text={data?.text} rank={data.data.rank} approvalDate={data?.approvalDate} />)
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
                      <input name="startDate" type="date" className={style.input} onChange={onChangeHandler}/>
                    </td>
                    <td className={style.tds}>
                      협조부서
                    </td>
                    <td className={style.td}>
                      <select onChange={onChangeHandler} name="coDept" className={style.dept}>
                        <option value="협조부서선택">협조부서선택</option>
                        <option value="경영팀">본부</option>
                        <option value="개발팀">영업팀</option>
                        <option value="지원팀">개발팀</option>
                        <option value="경영팀">인사팀</option>
                        <option value="개발팀">총무팀</option>
                        <option value="지원팀">마케팅팀</option>
                      </select>
                    </td>
                  </tr>
                  <tr className={style.tr}>
                    <td className={style.td}>제목</td>
                    <td className={style.td} >
                      <input name="title" type="text" placeholder="제목을 입력해주세요" className={style.input} onChange={onChangeHandler}/>
                    </td>
                    <td className={style.tds} >긴급여부</td>
                    <td className={style.td} >
                      <input
                          className={style.left}
                          name='emergency'
                          type="checkbox"
                          checked={data.emergency === 'Y'}
                          onChange={checkboxHandler}
                      />
                    </td>
                  </tr>
                  </tbody>
                </table>
                <Editor handler={setData}/>
              </div>
              {/* 파일컴포넌트 */}
              <DocFile handleFileChange={handleFileChange}/>
            </div>
          </div>
          <aside className={style.doc_side}>
            <DocumentSide approval={data.approvalList} reference={data.refList}/>
          </aside>
        </div>
      </>
  );
}

export default Draft;
