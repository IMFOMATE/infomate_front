import React, {useEffect} from 'react';
import style from '../../components/common/main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getList} from "../../apis/DocumentAPICalls";
import ToolbarApprovalTable from "../../components/approval/ele-component/table/toolbarApprovalTable";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {LoadingSpiner} from "../../components/common/other/LoadingSpiner";


function MyDocList() {
  /*여기서 url에 따라 다른 fetch가 일어나게하고
  * ToolbarApprovalTable에 넘어온 값을 넘겨주자 */
  const [searchParams, setSearchParams] = useSearchParams();
  const {pathname, search} = useLocation()
  const navigate = useNavigate();
  const path = pathname.split("/")[2];
  const filter = searchParams.get('status');

  const document = useSelector(state => state.documentsReducer);
  const dispatch = useDispatch();

  const updateQueryParams = (page, size, filter) => {
    const queryParams = new URLSearchParams(search);
    queryParams.set('page', page);
    queryParams.set('size', size);
    if (filter) {
      queryParams.set('status', filter);
    }
    navigate(`${pathname}?${queryParams.toString()}`);
  };

  useEffect(() => {
    // URL에서 필요한 정보 가져오기
    const params = new URLSearchParams(search);
    const page = parseInt(params.get('page')) || 0;
    const size = parseInt(params.get('size')) || 20;
    const filter = params.get('status');

    // 데이터 요청 및 Redux 스토어 업데이트
    dispatch(getList({ docStatus: path, page, size, filter }));
  }, [dispatch, search, path]);

  const pathToTitle = {
    ref: "참조문서",
    approval: "내 기안문서",
    temporary: "임시저장문서",
    credit: "결재대기문서",
    dept: "기안완료문서"
  };
  console.log(document)

  if(document === null) return <LoadingSpiner />

  return (
    <>
      <div className={style.maintitle}>
        <h2>
          {
            pathToTitle[path] ?? ''
          }
        </h2>
      </div>
          <ToolbarApprovalTable documentData={document} pageHandler={updateQueryParams} filter={filter}/>
    </>
  );
}



export default MyDocList;

