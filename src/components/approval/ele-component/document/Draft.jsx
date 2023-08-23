import React from 'react';
import DocButtons from "../common/DocButtons";
import InsertButton from "../buttons/InsertButton";
import {useNavigate} from "react-router-dom";
import style from '../../../../pages/approval/DocumentMain.module.css';
import DocumentSide from "./DocumentSide";
function Draft() {
  const navigate = useNavigate();

  const handleRequest = () => {};
  const handleTemp = () => {};
  const handleChoice =() => {};
  const handleCancel = () => navigate("/approval");

  const url = {
    request: handleRequest,
    temp: handleTemp,
    cancel: handleCancel,
    choice: handleChoice
  }

  return (
      <>
        <DocButtons button={<InsertButton url={url}/>}/>
        <div className={style.container}>
          <div className={style.docs}>

          </div>
          <aside className={style.doc_side}>
            <DocumentSide/>
          </aside>
        </div>
      </>
  );
}

export default Draft;
