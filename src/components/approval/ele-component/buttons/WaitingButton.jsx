import React from 'react';
import ButtonOutline from "../../../common/button/ButtonOutline";

function WaitingButton({url}) {
  const {request, choice} = url;

  const style = {
    padding: '10px',
    marginRight: '10px',
    fontWeight: 'bold'
  };

  return (
      <>
        <ButtonOutline value="상신취소" style={style} onClick={request}/>
        <ButtonOutline value="삭제" style={style} onClick={choice}/>
      </>
  );

}

export default WaitingButton;