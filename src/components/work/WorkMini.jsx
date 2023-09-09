import React from 'react';
import Clock from "../../pages/home/Clock";
import style from "./WorkMini.module.css";
import ButtonOutline from "../common/button/ButtonOutline";
import WorkChart from "./WorkChart";

function WorkMini() {
  return (
      <div className={style.work_wrapper}>
        <h3>근태관리</h3>
        <Clock/>
        <div className={`${style.flex}`}>
          <p className={style.text}>0H 0M 0S</p>
          {/*<WorkChart/>*/}
        </div>
        <div>
          <ul>
            <li>
              <dl className={style.dl}>
                <dt>출근시간</dt>
                <dd>미등록</dd>
              </dl>
            </li>
            <li>
              <dl className={style.dl}>
                <dt>퇴근시간</dt>
                <dd>미등록</dd>
              </dl>
            </li>
          </ul>
        </div>
        <div className={style.work_btn}>
          <ButtonOutline value='출근' style={{padding:'8px'}}/>
          <ButtonOutline value='퇴근' style={{padding:'8px'}}/>
        </div>
      </div>
  );
}

export default WorkMini;