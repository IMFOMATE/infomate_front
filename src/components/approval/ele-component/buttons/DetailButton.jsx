import React from 'react';
import ButtonOutline from "../../../common/button/ButtonOutline";
import btCss from '../common/DocButtons.module.css';
import {useNavigate} from "react-router-dom";
import { useReactToPrint } from 'react-to-print';


function DetailButton({condition, isOpen, reapply, deleteDoc, downDoc}) {
  const navigate = useNavigate();


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
        <ButtonOutline value="미리보기" style={style} onClick={downDoc}/>
      </div>
  );

}

export default DetailButton;