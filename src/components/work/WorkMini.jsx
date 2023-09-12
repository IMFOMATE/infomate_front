import React, {useEffect, useState} from 'react';
import Clock from "../../pages/home/Clock";
import style from "./WorkMini.module.css";
import ButtonOutline from "../common/button/ButtonOutline";
import WorkChart from "./WorkChart";
import {useDispatch, useSelector} from "react-redux";
import {attendAPI, finishAPI, getworkAPI} from "../../apis/WorkAPICall";
import {GET_WORK, PATCH_FINISH, POST_ATTEND} from "../../modules/WorkModule";
import WorkTimer from "../../pages/home/WorkTimer";

function WorkMini() {
  const dispatch = useDispatch();
  const workReducer = useSelector(state => state.workReducer);
  const workDate = useSelector(state => state.workReducer[GET_WORK]);

  const initTime = {
    startTime : '',
    endTime : ''
  }

  console.log()

  const [workTime, setWorkTime] = useState(initTime);

  useEffect(() => {
    dispatch(getworkAPI());

    setWorkTime({
      startTime: workDate?.startTime,
      endTime: workDate?.endTime,
    });

  }, [workDate?.startTime, workDate?.endTime, workReducer[POST_ATTEND]]);

  console.log(workDate)

  const handleAttend = () => {
    setWorkTime({
      ...workTime,
      attendTime: new Date().getTime()
    });
    dispatch(attendAPI())

  }

  const handelFinish = () => {
    setWorkTime({
      ...workTime,
      endTime: new Date().getTime()
    });
    dispatch(finishAPI())
  }
  // if(!workDate) return <LoadingSpiner />

  return (
      <div className={style.work_wrapper}>
        <h3>근태관리</h3>
        <Clock/>
        <div className={`${style.flex}`}>
          {/*<p className={style.text}>0H 0M 0S</p>*/}
          <WorkTimer startTime={workTime.startTime} endTime={workTime.endTime} />
          {/*<WorkChart/>*/}
        </div>
        <div>
          <ul>
            <li>
              <dl className={style.dl}>
                <dt>출근시간</dt>
                <dd> {workTime.startTime
                    ? new Date(workTime.startTime).toLocaleTimeString()
                    : '미등록'}
                </dd>
              </dl>
            </li>
            <li>
              <dl className={style.dl}>
                <dt>퇴근시간</dt>
                <dd> {workTime.endTime
                    ? new Date(workTime.endTime).toLocaleTimeString()
                    : '미등록'}
                </dd>
              </dl>
            </li>
          </ul>
        </div>
        <div className={style.work_btn}>
          <ButtonOutline value='출근' style={{padding:'8px'}} onClick={handleAttend}/>
          <ButtonOutline value='퇴근' style={{padding:'8px'}} onClick={handelFinish}/>
        </div>
      </div>
  );
}

export default WorkMini;