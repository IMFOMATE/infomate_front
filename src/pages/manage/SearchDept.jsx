import {React, useEffect} from "react";
import SdeptCss from "./SearchDept.module.css";
import GroupCss from './Group.module.css';
// import queryString from 'query-string';
import { useDispatch, useSelector } from "react-redux";
import Department from "./Department";
// import SearchList from "./SearchList";
import { useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import {
    // callDeptListAPI,
    getEmpListAPI
} from '../../apis/EmployeeAPI';
import { PagenationOther } from '../../components/common/other/PagenationOther';
import { GET_EMPLIST } from "../../modules/EmployeeModule";
import { LoadingSpiner } from "../../components/common/other/LoadingSpiner";
import queryString from 'query-string';
import { useLocation } from "react-router-dom";





function SearchDept(){
    
     // 페이징//////////////////////////
    const[searchs] = useSearchParams();

    // 검색어 ////////////////////////
    const { search } = useLocation();
    const { value } = queryString.parse(search);

    const [findSearch, setFindSearch] = useState('');
    const navigate = useNavigate();


    const empList = useSelector(state => state.employeeReducer[GET_EMPLIST]);
    const depts = useSelector(state => state.employeeReducer);

    const dispatch = useDispatch();
    

    const onSearchChangeHandler = (e) => {
        setFindSearch(e.target.value);
    }
    
    const onEnterKeyHandler = (e) => {
        if(e.key == 'Enter') {
            console.log('Enter key========', findSearch);

            navigate(`?value=${findSearch}`, { replace : false});

            window.location.reload();

        }
    }



 

 
 
 
    useEffect(() =>{
 
        dispatch(getEmpListAPI({page:{
 
            number: searchs.get('page'),
            size: searchs.get('size'),
            sortId: searchs.get('sort'),
            sertDirection: searchs.get('direction')
            
        }, findSearch: value
        }))
    },[searchs, findSearch])

    console.log("value=======>> ", findSearch);

    if(!empList) return <LoadingSpiner />
    console.log("검색어 확인좀여 ===", findSearch);   
    console.log("값확인하자~~~~~~+++++++++++++=====", depts);

    
    return(

        <>
            <main className={`main ${SdeptCss.main}`}>
                <h1>직원 조회</h1>
                <div className={`wrapSDept ${SdeptCss.wrapSDept}`}>
                    <div className={`schWrap ${SdeptCss.schWrap}`}>
                        <div className={`sc ${SdeptCss.sc}`}>
                            <span>직원 조회</span>
                            <input 
                            type="text" 
                            placeholder="직원명을 입력하세요"
                            value={ findSearch }
                            onKeyUp={ onEnterKeyHandler }
                            onChange={ onSearchChangeHandler }
                            />
                            {/* <button>검색</button> */}
                        </div>
                    </div>
                    <div className={`deptList ${SdeptCss.deptList}`}>
                        <table className={`listTable ${SdeptCss.listTable}`}>
                            <thead className={`th ${SdeptCss.th}`}>
                                <tr>
                                    <th>이름</th>
                                    <th>사원번호</th>
                                    <th>부서명</th>
                                    <th>정보</th>
                                </tr>
                            </thead>   
                            <tbody className={`tb ${SdeptCss.tb}`}>
                                    
                                    {
                                        empList.data.map((item, index) =>
                                            <Department
                                                key={index}
                                                dept = { item }
                                            />
                                        )
                                    }
                                </tbody>
                        </table>
                        {
                                    empList.pageInfo 
                                    && <PagenationOther 
                                        prev={empList.pageInfo.prev}
                                        next={empList.pageInfo.next}
                                        total={empList.pageInfo.total} 
                                        pageNum={empList.pageInfo.cri.pageNum}
                                        />
                                }
                    </div>
                </div>
            </main>
        </>
    )

}






export default SearchDept;
