import React, {useEffect} from 'react';
import ToolbarApprovalTable from "../../components/approval/ele-component/table/toolbarApprovalTable";
import style from '../../components/common/main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

function MyDocList({title}) {
  const location = useLocation();
  // const data =  location.state;
  const dispatch = useDispatch();
  const documentData = useSelector(state => state.documentsReducer);

  // console.log(data)
  /*여기서 url에 따라 다른 fetch가 일어나게하고
  * ToolbarApprovalTable에 넘어온 값을 넘겨주자 */
  useEffect(()=>{

  },[]);


  return (
    <>
      <div className={style.maintitle}>
        <h2>
          {title}
        </h2>
      </div>
      <ToolbarApprovalTable />
    </>
  );
}



export default MyDocList;

