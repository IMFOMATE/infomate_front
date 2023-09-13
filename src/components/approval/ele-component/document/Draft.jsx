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
import {treeviewAPI} from "../../../../apis/DepartmentAPI";
import {useDispatch, useSelector} from "react-redux";
import {draftRegistAPI} from "../../../../apis/DocumentAPICalls";
import {handleCancel, isValid, showValidationAndConfirm} from "../common/dataUtils";
import {decodeJwt} from "../../../../util/tokenUtils";
import {POST_DRAFT} from "../../../../modules/approval/DocumentModuels";
import {tempAPI} from "../../../../apis/ApprovalAPICalls";
import {POST_TEMP} from "../../../../modules/approval/ApprovalModuels";
import {GET_DEPTALL, GET_TREEVIEW} from "../../../../modules/DepartmentModule";
import {callDeptAllAPI} from "../../../../apis/DepartmentAPI";


function Draft({documentData, temp = false}) {
  const treeview = useSelector(state => state.departmentReducer[GET_TREEVIEW]);
  const deptData = useSelector(state => state.departmentReducer[GET_DEPTALL]);
  const documentReducer = useSelector(state => state.documentsReducer[POST_DRAFT]);
  const approval = useSelector(state => state.approvalReducer[POST_TEMP]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");
  const isReapply = path[path.length-1];
  const { data, setData } = useDraftDataContext();
  const [isModalOpen, setIsModalOpen] = useState(false);


  // 모달이 열릴 때 fetch GET 조직도 가지고옴
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
      setData({...documentData, fileList:[], existList:[...documentData.fileList], approvalList:modifiedApprovalList });
    }
    dispatch(callDeptAllAPI({deptCode:3}));

    if(documentReducer?.status === 200){
      console.log(documentReducer)
      navigate('/approval');
    }

  },[documentReducer]);

  // 데이터 핸들러
  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  // 체크박스 핸들러
  const checkboxHandler = (e) => {
    const newValue = e.target.checked ? 'Y' : 'N'; // 체크 여부에 따라 'Y' 또는 'N' 설정
    setData({
      ...data,
      [e.target.name]: newValue
    });
  };

  //모달 토글 버튼
  const toggleModal = () => setIsModalOpen(prev => !prev);



  // formData 생성하는 함수
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
    formData.append("coDept", data.coDept);
    formData.append("startDate", data.startDate.endsWith("00:00:00") ? data.startDate : data.startDate + ' 00:00:00');

    return formData;
  };

  //폼요청
  const requestApproval = (formData) => {
    dispatch(draftRegistAPI(formData));
  };

  const tempIsSave = data.documentStatus === "TEMPORARY";

  const tempApproval = (formData, type, docId, tempIsSave) => {
    dispatch(tempAPI(formData, type, docId, tempIsSave));
  };

  const tempRequest = (formData, type, docId, tempIsSave) => {
    dispatch(tempAPI(formData, type, docId, tempIsSave));
  };


  //유효성 및 결재 요청
  const handleRequest = () => {

    const validationResult = isValid(data,true, false);

    showValidationAndConfirm(
        validationResult, data.approvalList.length, '결재상신', '결재하시겠습니까??',
        () => {
          const formData = createFormData();
          tempIsSave ? tempApproval(formData, 'draft', data?.id, true) : requestApproval(formData);
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
          tempRequest(formData,'draft', data?.id, false);
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
          isModalOpen && <ApprovalModal contextType='draft' modalData={treeview} toggleModal={toggleModal}/>
        }
        <DocButtons button={<InsertButton url={url}/>}/>
        <div className={style.container}>
          <div className={style.docs}>
            <div className={style.doc}>
              <h2 className={style.doc_title}>업무기안</h2>
              <div className={style.doc_top}>
                <WriterInfo writer={writer} start={new Date()} id={data?.id}/>
                <div className={style.inline}>
                  {
                    data.approvalList.length !== 0 ?
                        data.approvalList.map((data, index) =>
                            <Credit
                                key={data.memberCode}
                                text={data?.text || (data.memberName)}
                                rank={data?.data?.rank || data.rankName}
                                approvalDate={data?.approvalDate || ''}
                                approvalStatus={data.approvalStatus || ''}
                            />)
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
                      <input
                          name="startDate"
                          type="date"
                          className={style.input}
                          onChange={onChangeHandler}
                          value={data.startDate?.split(' ')[0] || ''}
                      />
                    </td>
                    <td className={style.tds}>
                      협조부서
                    </td>
                    <td className={style.td}>
                      <select onChange={onChangeHandler}
                              name="coDept" className={style.dept}
                              value={data.coDept || ''}>
                        <option value="협조부서선택">협조부서선택</option>
                        {
                          deptData?.map((data, index)=>
                              <option key={index} value={data.deptName}>{data.deptName}</option>
                          )
                        }
                      </select>
                    </td>
                  </tr>
                  <tr className={style.tr}>
                    <td className={style.td}>제목</td>
                    <td className={style.td} >
                      <input
                          name="title"
                          type="text"
                          placeholder="제목을 입력해주세요"
                          className={style.input}
                          onChange={onChangeHandler}
                          value={data.title || ''}
                      />
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
                <Editor handler={setData} value={data.content}/>
              </div>
              {/* 파일컴포넌트 */}
              <DocFile handleFileChange={handleFileChange} value={data.existList || ''}/>
            </div>
          </div>
          <aside className={style.doc_side}>
            <DocumentSide approval={data.approvalList} reference={data.refList || ''}/>
          </aside>
        </div>
      </>
  );
}

export default Draft;
