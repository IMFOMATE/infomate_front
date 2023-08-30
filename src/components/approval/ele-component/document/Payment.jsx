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

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const {name, type} = location.state;
  const { data, setData } = usePaymentDataContext();

  const {title, content, emergency, refList, approvalList, fileList, paymentList} = data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

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

  const addRow = () => {
    const newPayment = {
      paymentDate: '',
      paymentSort: '',
      paymentPrice: '',
      paymentContent: '',
      remarks: ''
    };
    setData(prev =>({...prev, paymentList:[...paymentList, newPayment]}));
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...data.paymentList];
    updatedData[index][field] = value;
    setData(prevData => ({ ...prevData, paymentList: updatedData }));
  }

  const removeRow = () => {
    const updatedList = paymentList.slice(0,-1);
    setData(prev=>({...prev, paymentList: updatedList}));
  };

  const formatNumberWithCommas = (number) => {
    // return number.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateTotal = () => {
    const total = data.paymentList.reduce((acc, payment) => acc + parseFloat(payment.paymentPrice.replace(/,/g, '')), 0);
    return formatNumberWithCommas(total.toFixed(2));
  }

  //현재 문서작성자 -> 로컬스토리지에서 가져오기
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
        {
            isModalOpen && <ApprovalModal contextType='payment' modalData={modalData} toggleModal={toggleModal}/>
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
                        data.approvalList.map((data, index) => <Credit key={index} approval={data} />)
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
                      <input name="startDate" type="date" className={style.input} onChange={onChangeHandler}/>
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
                      <input name="title" type="text" placeholder="제목을 입력해주세요" className={style.input} onChange={onChangeHandler}/>
                    </td>
                    <td className={style.tds}>
                      총금액
                    </td>
                    <td className={style.td}>
                      {calculateTotal()}
                    </td>
                  </tr>
                  <tr>
                    <td className={style.tds}>지출사유</td>
                    <td colSpan={3}>
                      <textarea className={style.textarea} name="content" id="reason" cols="30" rows="10" onChange={onChangeHandler}/>
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
                        paymentList.map((value, index)=>
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
                        <td colSpan="1">{calculateTotal()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
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

export default Payment;