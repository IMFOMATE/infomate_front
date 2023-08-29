import React, {useEffect, useState} from 'react';
import style from '../../components/common/main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getApprovalList, getCreditList, getRefList} from "../../apis/DocumentAPICalls";
import ToolbarApprovalTable from "../../components/approval/ele-component/table/toolbarApprovalTable";
import {GET_DOCUMENT_APRPROVALLIST} from "../../modules/approval/DocumentModuels";

function MyDocList({title}) {

  /*여기서 url에 따라 다른 fetch가 일어나게하고
  * ToolbarApprovalTable에 넘어온 값을 넘겨주자 */
    const document = useSelector(state => state.documentsReducer);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [filter, setFilter] = useState('');
    // const location = useLocation();
    // const queryString = location.search;

    useEffect(() => {
      setCurrentPage(0);
      setFilter(filter);
      dispatchData();
    }, [title, filter]);


  console.log(filter);

  const dispatchData = () => {
    console.log('check')
    if (title === '기안문서') {
      dispatch(getApprovalList({ memberCode: 2, page: currentPage, status: filter }));
    } else if (title === '임시저장문서') {

    } else if (title === '참조문서') {
      const params = filter ? { memberCode: 2, page: currentPage, status: filter } : { memberCode: 2, page: currentPage };
      dispatch(getRefList(params));
    } else if (title === '결재대기문서') {
      dispatch(getCreditList({ memberCode: 2, page: currentPage}))
    } else if (title === '결재완료문서') {
      // Handle other cases if needed
    }
  };

  return (
    <>
      <div className={style.maintitle}>
        <h2>
          {title}
        </h2>
      </div>
      <ToolbarApprovalTable documentData={document} pageHandler={setCurrentPage} filterHandler={setFilter} filter={filter}/>
    </>
  );
}



export default MyDocList;

