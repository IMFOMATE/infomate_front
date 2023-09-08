import {React, useEffect} from "react";
import SdeptCss from "./SearchDept.module.css";
import Department from "./Department";
import { useDispatch, useSelector } from "react-redux";
import {
    // callDeptListAPI,
    getEmpListAPI
} from '../../apis/EmployeeAPI';
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingSpiner } from "../../components/common/other/LoadingSpiner";
import { GET_EMPLIST } from "../../modules/EmployeeModule";
import { Pagenation } from '../../components/common/other/Pagenation';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";





function SearchList(dept) {

    // 페이징//////////////////////////
    const[search] = useSearchParams();

    // 검색어 ////////////////////////
    // const { search } = useLocation();
    // const { value } = queryString.parse(search);



    const navigate = useNavigate();
    const empList = useSelector(state => state.employeeReducer[GET_EMPLIST]);
    const depts = useSelector(state => state.employeeReducer);
    

    const dispatch = useDispatch();


    useEffect(() =>{

        dispatch(getEmpListAPI({page:{

            number: search.get('page'),
            size: search.get('size'),
            sortId: search.get('sort'),
            sertDirection: search.get('direction'),
            // search: value
        }
        }))
    },[search])



    if(!empList) return <LoadingSpiner />
    
    console.log("dets ======> 값 들어오는지 확인=====", depts);
    console.log("empList ======> 값 들어오는지 확인=====", empList);


    return(

        <>
            <tbody className={`tb ${SdeptCss.tb}`}>
                                    
                {
                    empList.data.map((item, index) =>
                        <Department
                            key={index}
                            // key = { item.department.deptCode }
                            dept = { item }
                        />
                                            
                    )

                }
            </tbody>
            {
                empList.pageInfo 
                && <Pagenation 
                    prev={empList.pageInfo.prev}
                    next={empList.pageInfo.next}
                    total={empList.pageInfo.total} 
                    pageNum={empList.pageInfo.cri.pageNum}
                    />
            }
        </>

    )
}


export default SearchList;