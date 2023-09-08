import {React, useEffect} from "react";
// import DeptCss from "./SearchDept.module.css";
import SdeptCss from "./SearchDept.module.css";
// import DeptList from "./DeptList"
import GroupCss from './Group.module.css';
import {
    callDeptListAPI
} from '../../apis/EmployeeAPI';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Department from "./Department";
import { MEMBER_CODE } from "../../apis/APIConfig";
import { GET_DEPTLIST } from "../../modules/EmployeeModule";








function SearchDept(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const depts = useSelector(state => state.employeeReducer);
    const deptList = depts.data;

    const pageInfo = depts.pageInfo;

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);


    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            setStart((currentPage -1) * 5);
            dispatch(callDeptListAPI({
                currentPage: currentPage
            }));
        }
        ,[currentPage]
    );



    // useEffect(
    //     () => {
    //         dispatch(callDeptListAPI());
    //     },
    //     []
    // )
    
    console.log("값 들어오는지 확인", depts);

    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }


    const onEnterkeyHandler = (e) =>{
        if(e.key == 'Enter') {
            console.log('Enter key', search);

            navigate(`/search?value=${search}`, { replace : false });

            window.location.reload();
        }
    }



    return(

        <>
            <main className={`main ${SdeptCss.main}`}>
                <h1>부서별 조회</h1>
                <div className={`wrapSDept ${SdeptCss.wrapSDept}`}>
                    <div className={`schWrap ${SdeptCss.schWrap}`}>
                        <div className={`sc ${SdeptCss.sc}`}>
                            <span>부서별 조회</span>
                            <input 
                            type="text" 
                            placeholder="부서명을 입력하세요"
                            value={ search }
                            onKeyUp={ onEnterkeyHandler }
                            onChange={ onSearchChangeHandler }
                            />
                            <button>검색</button>
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
                                    {/* <DeptList /> */}
                                    {
                                        Array.isArray(depts) && depts.map((d) => (<Department key={ d.department.deptCode } dept={ d }/>))
                                    }
                            </tbody>

                        </table>
                        <div style={{ listStyleType: "none", display: "flex" }}>
                        { Array.isArray(depts) &&
                        <button 
                            onClick={() => setCurrentPage(currentPage - 1)} 
                            disabled={currentPage === 1}
                            className='paginBtn'
                        >
                            &lt;
                        </button>
                        }
                        {pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}>
                            <button
                                style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                                className='paginBtn'
                            >
                                {num}
                            </button>
                        </li>
                        ))}
                        { Array.isArray(depts) &&
                        <button 
                            className='paginBtn'
                            onClick={() => setCurrentPage(currentPage + 1)} 
                            disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                        >
                            &gt;
                        </button>
                        }
                    </div>
                    </div>
                </div>
            </main>
        </>
    )

}


// const memberList = [
//     {
//         name: "윤팀장",
//         num: 'j123456',
//         dept: "인사관리 3팀",
//         link: '../memberInfo'
//     },
//     {
//         name: "김과장",
//         num: 'g324216',
//         dept: "리스크관리 1팀",
//         link: '../memberInfo'

//     },
//     {
//         name: "이대리",
//         num: 'j34566',
//         dept: "온라인 영업 1팀",
//         link: '../memberInfo'

//     },
//     {
//         name: "팽사원",
//         num: 'j123456',
//         dept: "자금운영 3팀",
//         link: '../memberInfo'

//     },
//     {
//         name: "윤팀장",
//         num: 'j123456',
//         dept: "회계관리 3팀",
//         link: '../memberInfo'

//     },
//     {
//         name: "윤팀장",
//         num: 'j123456',
//         dept: "인사관리 3팀",
//         link: '../memberInfo'

//     },
//     {
//         name: "김과장",
//         num: 'g324216',
//         dept: "온라인 영업 3팀",
//         link: '../memberInfo'

//     },
//     {
//         name: "이대리",
//         num: 'j34566',
//         dept: "인사관리 3팀",
//         link: '../memberInfo'

//     },
//     {
//         name: "팽사원",
//         num: 'j123456',
//         dept: "회계관리 3팀",
//         link: '../memberInfo'

//     },
//     {
//         name: "윤팀장",
//         num: 'j123456',
//         dept: "인사관리 3팀",
//         link: '../memberInfo'

//     }
// ]


export default SearchDept;
