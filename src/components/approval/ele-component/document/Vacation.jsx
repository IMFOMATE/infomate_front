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
import {treeviewAPI} from "../../../../apis/DepartmentAPI";
import {
  formatApprovalDate,
  formatInputDate,
  handleCancel,
  isValid,
  showValidationAndConfirm
} from "../common/dataUtils";
import {vacationRegistAPI} from "../../../../apis/DocumentAPICalls";
import {decodeJwt} from "../../../../util/tokenUtils";
import {POST_DRAFT, POST_VACATION} from "../../../../modules/approval/DocumentModuels";
import {tempAPI} from "../../../../apis/ApprovalAPICalls";
import {GET_TREEVIEW} from "../../../../modules/DepartmentModule";
import {POST_TEMP} from "../../../../modules/approval/ApprovalModuels";

function Vacation({documentData, temp = false}) {
  const treeview = useSelector(state => state.departmentReducer[GET_TREEVIEW]);
  const documentReducer = useSelector(state => state.documentsReducer[POST_VACATION]);
  const approval = useSelector(state => state.approvalReducer[POST_TEMP]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");
  const isReapply = path[path.length-1];
  const { data, setData } = useVacationDataContext();
  const { sort, startDate, endDate} = data;
  const [isModalOpen, setIsModalOpen] = useState(false);


  // 모달이 열릴 때 fetch GET 조직도 가지고옴 -> modalData
  useEffect(()=>{
    if (isModalOpen){
      dispatch(treeviewAPI());
    }
  },[isModalOpen]);

  useEffect(() => {
    if(isReapply === 'reapply' || temp){
      const modifiedApprovalList = documentData.approvalList.map(approval => ({
        ...approval,
        approvalStatus: '',
        approvalDate: '',
        comment:''
      }));

      setData({...documentData, fileList:[], existList:[...documentData.fileList], approvalList:modifiedApprovalList});
    }

    if(documentReducer?.status === 200){
      console.log(documentReducer)
      navigate('/approval');
    }

  },[documentReducer]);

  console.log(data)

  // form 데이터
  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  console.log(data)
  const checkboxHandler = (e) => {
    const newValue = e.target.checked ? 'Y' : 'N'; // 체크 여부에 따라 'Y' 또는 'N' 설정
    setData({
      ...data,
      [e.target.name]: newValue
    });
  };

  // const onStartDateChange = (e) => {
  //   if(sort === '오전반차'){
  //
  //     setData({...data, startDate:e.target.value + ' 09:00:00',endDate: e.target.value + ' 13:00:00'});
  //     return;
  //   }
  //   if(sort === '오후반차'){
  //     setData({...data, startDate:e.target.value + ' 13:00:00',endDate: e.target.value + ' 18:00:00'});
  //     return;
  //   }
  //   setData({...data, startDate:e.target.value + ' 09:00:00'})
  // };

  const onStartDateChange = (e) => {
    let startDate;
    let endDate;

    switch (sort) {
      case '오전반차':
        startDate = `${e.target.value} 09:00:00`;
        endDate = `${e.target.value} 13:00:00`;
        break;

      case '오후반차':
        startDate = `${e.target.value} 13:00:00`;
        endDate = `${e.target.value} 18:00:00`;
        break;

      default:
        startDate = `${e.target.value} 09:00:00`;
        break;
    }

    const newData = { ...data, startDate, endDate };
    setData(newData);
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

  const createFormData = () => {
    const formData = new FormData();

    if(data.existList){
      data.existList.forEach((ex, index) => {
        formData.append(`existList[${index}]`, ex.fileCode);
      });
    }

    data.fileList.forEach((file) => {
      formData.append("fileList", file); // 각 파일을 formData에 추가
    });

    data.approvalList.forEach((app, index) => {
      formData.append(`approvalList[${index}].id`, app.memberCode);
      formData.append(`approvalList[${index}].order`, index + 1);
    });

    data.refList.forEach((app, index) => {
      formData.append(`refList[${index}].id`, app.memberCode);
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

  const requestApproval = (formData) => {
    dispatch(vacationRegistAPI(formData));
  };

  const tempIsSave = data.documentStatus === "TEMPORARY";

  const tempApproval = (formData, type, docId, save) => {
    dispatch(tempAPI(formData, type, docId, save));
  };

  const tempRequest = (formData, type, docId, save) => {
    dispatch(tempAPI(formData, type, docId, save));
  };


  //결제 요청 api
  const handleRequest = () => {

    console.log(data);
    const validationResult = isValid(data,true,true);

    showValidationAndConfirm(
        validationResult, data.approvalList.length, '결재상신', '결재하시겠습니까??',
        () => {
          const formData = createFormData();
          tempIsSave ? tempApproval(formData, 'vacation', data?.id, true) : requestApproval(formData);
        }
    )
  };

  // 임시저장 api
  const handleTemp = () => {
    const validationResult = isValid(data,true, false);
    console.log(data)
    showValidationAndConfirm(
        validationResult, data.approvalList.length, '임시저장', '임시저장하시겠습니까??',
        () => {
          const formData = createFormData();
          tempRequest(formData,'vacation', data?.id, false);
        }
    )
  };


  const handleChoice = toggleModal;  //결재선 지정 모달
  const cancelAction = () => navigate("/approval");

  // 파일 저장
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setData({...data, fileList: newFiles});
  };

  //현재 문서작성자 -> 로컬스토리지에서 가져오기
  const token = decodeJwt(window.localStorage.getItem('accessToken'));
  //현재 문서작성자 -> 로컬스토리지에서 가져오기
  const writer= {
    memberName : token.memberName,
    deptName : token.department,
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
              <h2 className={style.doc_title}>{data.title || ''}</h2>
              <div className={style.doc_top}>
                <WriterInfo writer={writer} start={new Date()}/>
                <div className={style.inline}>
                  {
                    data.approvalList.length !== 0 ?
                        data.approvalList.map((data, index) =>
                            <Credit
                                key={data.memberCode}
                                text={data?.text || (data.memberName)}
                                rank={data?.data?.rank || data.rankName}
                                approvalDate={data?.approvalDate || ''}
                                approvalStatus={data?.approvalStatus || ''}
                            />)
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
                      <input
                          name='title'
                          type="text"
                          defaultValue={data.title || ''}
                      />
                    </td>
                  </tr>
                  <tr className={style.tr}>
                    <td className={ style.td}>작성일자</td>
                    <td className={style.td}>
                      <span>
                        {data?.createdDate
                            ? formatApprovalDate(data?.createdDate)
                            : formatApprovalDate(new Date())
                        }
                      </span>
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
                      <select
                          className={style.input}
                          name='sort'
                          onChange={onChangeHandler}
                          // defaultValue={data.sort }
                          value={data.sort || ''}
                      >
                        <option value="연차">연차</option>
                        <option value="오전반차">오전반차</option>
                        <option value="오후반차">오후반차</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className={style.tds}>기간</td>
                    <td colSpan={3} className={style.td}>
                      <input
                          className={style.td}
                          name='startDate'
                          type="date"
                          onChange={onStartDateChange}
                          value={formatInputDate(data.startDate)} // value 속성을 사용해 값을 동적으로 설정
                          // defaultValue={data.startDate}
                      />
                      {
                        sort === '연차' ?
                        <>
                          <span> ~ </span>
                          <input
                              className={style.td}
                              name='endDate'
                              type="date"
                              onChange={onEndDateChange}
                              value={formatInputDate(data.endDate)}
                              // defaultValue={data.endDate}
                          />
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
                      <textarea
                          className={style.textarea}
                          name="content"
                          cols="30" rows="10"
                          onChange={onChangeHandler}
                          defaultValue={data.content || ''}
                      />
                    </td>
                  </tr>

                  </tbody>
                </table>
              </div>
              {/* 파일컴포넌트 */}
              <DocFile handleFileChange={handleFileChange} value={data.existList || ''}/>
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