import React from 'react';
import ButtonOutline from "../../../common/button/ButtonOutline";

function InsertButton({url}) {
  const {request, temp, cancel, choice} = url;

  const style = {
    padding: '10px',
    marginRight: '10px',
    fontWeight: 'bold'
  };

  return (
      <>
        <ButtonOutline value="결제요청" style={style} onClick={request}/>
        <ButtonOutline value="임시저장" style={style} onClick={temp}/>
        <ButtonOutline value="취소" style={style} onClick={cancel}/>
        <ButtonOutline value="결재선 선택" style={style} onClick={choice}/>
      </>
  );
}

export default InsertButton;