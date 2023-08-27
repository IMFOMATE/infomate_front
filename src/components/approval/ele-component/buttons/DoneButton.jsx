import React from 'react';
import ButtonOutline from "../../../common/button/ButtonOutline";

function DoneButton({url}) {
  const {request, choice} = url;

  const style = {
    padding: '10px',
    marginRight: '10px',
    fontWeight: 'bold'
  };

  return (
      <>
        <ButtonOutline value="재기안" style={style} onClick={request}/>
        <ButtonOutline value="삭제" style={style} onClick={choice}/>
      </>
  );
}

export default DoneButton;