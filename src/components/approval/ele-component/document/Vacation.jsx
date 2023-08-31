import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useVacationDataContext} from "../../../../context/approval/VacationDataContext";
import ApprovalModal from "../modal/ApprovalModal";
import DocButtons from "../common/DocButtons";
import InsertButton from "../buttons/InsertButton";
import style from "../../../../pages/approval/DocumentMain.module.css";
import WriterInfo from "./WriterInfo";
import Credit from "./Credit";
import DocFile from "../common/DocFile";
import {useDispatch, useSelector} from "react-redux";
import DocumentSide from "./DocumentSide";
import Swal from "sweetalert2";
import {treeviewAPI} from "../../../../apis/Department.API";
import {formatApprovalDate, handleCancel, isValid, showValidationAndConfirm} from "../common/dataUtils";
import {vacationRegistAPI} from "../../../../apis/DocumentAPICalls";

function Vacation() {
  const treeview = useSelector(state => state.departmentReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {name, type} = location.state;
  const { data, setData } = useVacationDataContext();
  const { sort, startDate, endDate} = data;
  const [isModalOpen, setIsModalOpen] = useState(false);


  // 모달이 열릴 때 fetch GET 조직도 가지고옴 -> modalData
  useEffect(()=>{
    if (isModalOpen){
      dispatch(treeviewAPI());
    }
  },[isModalOpen]);

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

  const onStartDateChange =(e) => {
    if(sort === '오전반차'){
      setData({...data, startDate:e.target.value + ' 09:00:00',endDate: e.target.value + ' 13:00:00'});
      return;
    }
    if(sort === '오후반차'){
      setData({...data, startDate:e.target.value + ' 13:00:00',endDate: e.target.value + ' 18:00:00'});
      return;
    }
    setData({...data, startDate:e.target.value + ' 09:00:00'})
  };

  const onEndDateChange = (e) => {

    if(new Date(e.target.value) < new Date(startDate)){
      Swal.fire({
        icon: 'error',
        text: '종료날짜는 시작날짜보다 작을 수 없습니다'
      })
    }

    setData({...data, endDate:e.target.value + ' 18:00:00'})
  }

  const requestApproval = (formData) => {
    dispatch(vacationRegistAPI(formData));
  };


  const createFormData = () => {
    const formData = new FormData();

    data.fileList.forEach((file) => {
      formData.append("fileList", file); // 각 파일을 formData에 추가
    });

    data.approvalList.forEach((app, index) => {
      formData.append(`approvalList[${index}].id`, app.data.memberCode);
      formData.append(`approvalList[${index}].order`, index + 1);
    });

    data.refList.forEach((app, index) => {
      formData.append(`refList[${index}].id`, app.data.memberCode);
    });

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("emergency", data.emergency ?? "N");
    formData.append("sort", data.sort);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("reason", data.reason);

    return formData;
  };


  //모달 토글 버튼
  const toggleModal = () => setIsModalOpen(prev => !prev);

  //결제 요청 api
  const handleRequest = () => {


    console.log(data);
    const validationResult = isValid(data);

    showValidationAndConfirm(
        validationResult, data.approvalList.length,
        () => {
          const formData = createFormData();
          requestApproval(formData);
        }
    )
  };

  // 임시저장 api
  const handleTemp = () => {};

  //
  const handleChoice = toggleModal;  //결재선 지정 모달
  const cancelAction = () => navigate("/approval");

  // 파일 저장
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setData({...data, fileList: newFiles});
  };

  //현재 문서작성자 -> 로컬스토리지에서 가져오기
  const writer= {
    memberName : '주진선',
    deptName : '개발부서',
  }

  //버튼에 함수 넘겨주기
  const url = {
    request: handleRequest,
    temp: handleTemp,
    cancel: () => {handleCancel(cancelAction)},
    choice: handleChoice
  }

  return (
      <>
        {
            isModalOpen && <ApprovalModal contextType='vacation' modalData={treeview} toggleModal={toggleModal}/>
        }
        <DocButtons button={<InsertButton url={url}/>}/>
        <div className={style.container}>
          <div className={style.docs}>
            <div className={style.doc}>
              <h2 className={style.doc_title}>{name}</h2>
              <div className={style.doc_top}>
                <WriterInfo writer={writer} start={new Date()}/>
                <div className={style.inline}>
                  {
                    data.approvalList.length !== 0 ?
                        data.approvalList.map((data, index) => <Credit key={data.memberCode} text={data.text} rank={data.data.rank} approvalDate={data?.approvalDate} />)
                        : ""
                  }
                </div>
              </div>
              <div className={style.doc_content}>
                {/*이것도 컴포넌트로........*/}
                <table className={`${style.top_table} ${style.doc_content}`}>
                  <tbody>
                  <tr className={style.none}>
                    <td>
                      <input name='title' defaultValue={name} type="text"/>
                    </td>
                  </tr>
                  <tr className={style.tr}>
                    <td className={style.td}>작성일자</td>
                    <td className={style.td}>
                      <span>{formatApprovalDate(new Date())}</span>
                    </td>
                    <td className={`${style.tds} ${style.td}`} >긴급여부</td>
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
                  <tr className={style.tr}>
                    <td className={style.td}>휴가종류</td>
                    <td className={style.td} colSpan={3}>
                      <select className={style.input} name='sort' onChange={onChangeHandler}>
                        <option value="연차">연차</option>
                        <option value="오전반차">오전반차</option>
                        <option value="오후반차">오후반차</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className={style.tds}>기간</td>
                    <td colSpan={3} className={style.td}>
                      <input className={style.td} name='startDate' type="date" onChange={onStartDateChange} />
                      {
                        sort === '연차' ?
                        <>
                          <span> ~ </span>
                          <input className={style.td} name='endDate' type="date" onChange={onEndDateChange}/>
                        </>
                        : ''
                      }
                      <span>
                      {/*{*/}
                      {/*  diffDate(data.startDate, data.endDate)*/}
                      {/*} 일*/}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className={style.tds}>휴가 사유</td>
                    <td colSpan={3}>
                      <textarea className={style.textarea} name="content" cols="30" rows="10" onChange={onChangeHandler}/>
                    </td>
                  </tr>

                  </tbody>
                </table>
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

export default Vacation;