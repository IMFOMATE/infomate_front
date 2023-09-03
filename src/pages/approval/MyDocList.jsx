import React, {useEffect, useState} from 'react';
import style from '../../components/common/main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getList} from "../../apis/DocumentAPICalls";
import ToolbarApprovalTable from "../../components/approval/ele-component/table/toolbarApprovalTable";
import {useLocation, useParams, useSearchParams} from "react-router-dom";


function MyDocList() {
  /*여기서 url에 따라 다른 fetch가 일어나게하고
  * ToolbarApprovalTable에 넘어온 값을 넘겨주자 */
  const [searchParams, setSearchParams] = useSearchParams();
  const {pathname} = useLocation()
  const path = pathname.split("/")[2];
  const page = searchParams.get('page') ?? 0 ;
  const size = searchParams.get('size') ?? 20 ;
  const filter = searchParams.get('status');

  const document = useSelector(state => state.documentsReducer);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
      setCurrentPage(page);
      dispatch(getList({docStatus: path, page:page, size:size, filter:filter}))
      // dispatchData();
    }, [path, page, filter]);

  const pathToTitle = {
    ref: "참조문서",
    approval: "내 기안문서",
    temporary: "임시저장문서",
    credit: "결재대기문서",
  };

  return (
    <>
      <div className={style.maintitle}>
        <h2>
          {
            pathToTitle[path] ?? ''
          }
        </h2>
      </div>
          <ToolbarApprovalTable documentData={document} pageHandler={setCurrentPage} page={currentPage} filter={filter}/>
    </>
  );
}



export default MyDocList;

