import React, {forwardRef} from 'react';
import ButtonOutline from "../../../common/button/ButtonOutline";
import btCss from '../common/DocButtons.module.css';
import {useNavigate} from "react-router-dom";
import ReactToPrint, { useReactToPrint } from 'react-to-print';


const DetailButton = forwardRef(({condition, isOpen, reapply, deleteDoc}, ref) =>{
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: ()=>ref.current, // 프린트할 컴포넌트를 지정합니다.
  });

  const style = {
    padding: '10px',
    marginRight: '10px',
    fontWeight: 'bold'
  };



  return (
      <div className={btCss.buttons}>
        {condition.isCredit && (
            <>
              <ButtonOutline value="결재" style={style} onClick={()=>{isOpen('결재','결재의견을 작성해주세요.')}}/>
              <ButtonOutline value="반려" style={style} onClick={()=>{isOpen('반려','반려의견을 반드시 작성해주세요.')}}/>
            </>
        )}
        {condition.isCancel && (
            <>
              <ButtonOutline value="삭제" style={style} onClick={deleteDoc} />
            </>
        )}
        {condition.isDept && (
            <>
              <ButtonOutline value="재기안" style={style} onClick={reapply} />
            </>
        )}
        <ButtonOutline value="목록" style={style} onClick={() => {}}/>
        <ButtonOutline value="미리보기" style={style} onClick={handlePrint}/>
      </div>
  );

})

export default DetailButton;