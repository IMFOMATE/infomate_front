import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {usePaymentDataContext} from "../../../../context/approval/PaymentDataContext";
import ApprovalModal from "../modal/ApprovalModal";
import DocButtons from "../common/DocButtons";
import InsertButton from "../buttons/InsertButton";
import style from "../../../../pages/approval/DocumentMain.module.css";
import WriterInfo from "./WriterInfo";
import Credit from "./Credit";
import DocFile from "../common/DocFile";
import DocumentSide from "./DocumentSide";
import ButtonInline from "../../../common/button/ButtonInline";
import PaymentList from "./PaymentList";
import {useDispatch, useSelector} from "react-redux";
import {treeviewAPI} from "../../../../apis/DepartmentAPI";
import {paymentRegistAPI} from "../../../../apis/DocumentAPICalls";
import {
  formatApprovalDate,
  formatNumberWithCommas,
  handleCancel,
  isPaymentValid,
  showValidationAndConfirm
} from "../common/dataUtils";
import {decodeJwt} from "../../../../util/tokenUtils";
import {tempAPI} from "../../../../apis/ApprovalAPICalls";
import {POST_PAYMENT} from "../../../../modules/approval/DocumentModuels";
import {POST_TEMP} from "../../../../modules/approval/ApprovalModuels";
import {GET_TREEVIEW} from "../../../../modules/DepartmentModule";

function Payment({documentData, temp = false} ) {
  const treeview = useSelector(state => state.departmentReducer[GET_TREEVIEW]);
  const documentReducer = useSelector(state => state.documentsReducer[POST_PAYMENT]);
  const approval = useSelector(state => state.approvalReducer[POST_TEMP]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");
  const isReapply = path[path.length-1];
  const { data, setData } = usePaymentDataContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    console.log("documentReducer:",documentReducer)

    if(documentReducer?.status === 200){
      navigate('/approval');
    }

  },[documentReducer]);

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

  //모달 토글 버튼
  const toggleModal = () => setIsModalOpen(prev => !prev);

  //폼 데이터 생성
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
      formData.append(`approvalList[${index}].id`,app.memberCode);
      formData.append(`approvalList[${index}].order`, index + 1);
    });

    data.refList.forEach((app, index) => {
      formData.append(`refList[${index}].id`, app.memberCode);
    });

    data.paymentList.forEach((app, index) => {
      formData.append(`paymentList[${index}].paymentDate`, app.paymentDate);
      formData.append(`paymentList[${index}].paymentSort`, app.paymentSort);
      formData.append(`paymentList[${index}].paymentPrice`, app.paymentPrice);
      formData.append(`paymentList[${index}].paymentContent`, app.paymentContent);
      formData.append(`paymentList[${index}].remarks`, app.remarks);
    });

    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("emergency", data.emergency ?? "N");

    return formData;
  };

  const tempIsSave = data.documentStatus === "TEMPORARY";

  const requestApproval = (formData) => {
    dispatch(paymentRegistAPI(formData));
  };

  const tempApproval = (formData, type, docId, tempIsSave) => {
    dispatch(tempAPI(formData, type, docId, tempIsSave));
  };

  const tempRequest = (formData, type, docId, tempIsSave) => {
    dispatch(tempAPI(formData, type, docId, tempIsSave));
  };

  //결제 요청 api
  const handleRequest = () => {

    const validationResult = isPaymentValid(data, false);

    showValidationAndConfirm(
        validationResult, data.approvalList.length, '결재상신', '결재하시겠습니까??',
        () => {
          const formData = createFormData();
          tempIsSave ? tempApproval(formData, 'payment', data?.id, true) : requestApproval(formData);
        }
    )
  };

  // 임시저장 api
  const handleTemp = () => {
    const validationResult = isPaymentValid(data, false);
    console.log(data)
    showValidationAndConfirm(
        validationResult, data.approvalList.length, '임시저장', '임시저장하시겠습니까??',
        () => {
          const formData = createFormData();
          tempRequest(formData,'payment', data?.id, false);
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

  const addRow = () => {
    const newPayment = {
      paymentDate: '',
      paymentSort: '',
      paymentPrice: '',
      paymentContent: '',
      remarks: ''
    };
    setData(prev =>({...prev, paymentList:[...prev.paymentList, newPayment]}));
  };


  const handleInputChange = (index, field, value) => {
    const updatedData = [...data.paymentList];
    updatedData[index][field] = value;
    setData(prevData => ({ ...prevData, paymentList: updatedData }));
  }

  const removeRow = () => {
    const updatedList = data.paymentList.slice(0,-1);
    setData(prev=>({...prev, paymentList: updatedList}));
  };


  const calculateTotal = () => {
    const totalPaymentPrice = data.paymentList.reduce((total, payment) => {
      return parseInt(total) + parseInt(payment.paymentPrice);
    }, 0);
    return Math.floor(totalPaymentPrice);
  }


  //현재 문서작성자 -> 로컬스토리지에서 가져오기
  const token = decodeJwt(window.localStorage.getItem('accessToken'));
  //현재 문서작성자 -> 로컬스토리지에서 가져오기
  const writer= {
    memberName : token?.memberName,
    deptName : token?.department,
  }

  //버튼에 함수 넘겨주기
  const url = {
    request: handleRequest,
    temp: handleTemp,
    cancel:() => {handleCancel(cancelAction)},
    choice: handleChoice
  }
  return (
      <>
        {
            isModalOpen && <ApprovalModal contextType='payment' modalData={treeview} toggleModal={toggleModal}/>
        }
        <DocButtons button={<InsertButton url={url}/>}/>
        <div className={style.container}>
          <div className={style.docs}>
            <div className={style.doc}>
              <h2 className={style.doc_title}>지출결의서</h2>
              <div className={style.doc_top}>
                <WriterInfo writer={writer} start={new Date()}/>
                <div className={style.inline}>
                  {
                    data.approvalList.length !== 0 ?
                        data.approvalList.map((data, index) =>
                            <Credit
                                key={data?.memberCode}
                                text={data?.text || (data?.memberName)}
                                rank={data?.data?.rank || data?.rankName}
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
                  <tr className={style.tr}>
                    <td className={style.td}>작성일자</td>
                    <td className={style.td}>
                      <span>
                        {formatApprovalDate(new Date())}
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
                    <td className={style.tds}>
                      총금액
                    </td>
                    <td className={style.td}>
                      {formatNumberWithCommas(calculateTotal().toString())}원
                    </td>
                  </tr>
                  <tr>
                    <td className={style.tds}>지출사유</td>
                    <td colSpan={3}>
                      <textarea
                          className={style.textarea}
                          name="content" cols="30" rows="10"
                          onChange={onChangeHandler}
                          value={data.content || ''}
                      />
                    </td>
                  </tr>
                  </tbody>
                </table>

                <div>
                  <div className={style.button}>
                    <ButtonInline onClick={addRow} value='추가' style={{marginRight:'10px'}}/>
                    <ButtonInline onClick={removeRow} value='삭제'/>
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
                            <PaymentList
                                key={index}
                                payment={value}
                                onUpdate={(field, value)=> handleInputChange(index, field, value)}
                            />)
                      }
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="1" className={style.sum}></td>
                        <td className={style.sum}>합계 : </td>
                        <td colSpan="1">{formatNumberWithCommas(calculateTotal().toString())}원</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
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

export default Payment;