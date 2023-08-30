import React from "react";
// import DeptCss from "./SearchDept.module.css";
import SdeptCss from "./SearchDept.module.css";
import DeptList from "./DeptList"
import GroupCss from './Group.module.css';






function SearchDept(){

    return(

        <>
            <main className={`main ${SdeptCss.main}`}>
                <h1>부서별 조회</h1>
                <div className={`wrapSDept ${SdeptCss.wrapSDept}`}>
                    <div className={`schWrap ${SdeptCss.schWrap}`}>
                        <div className={`sc ${SdeptCss.sc}`}>
                            <span>부서별 조회</span>
                            <input type="text" placeholder="부서명을 입력하세요"/>
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
                                    <DeptList data={memberList}/>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )

}


const memberList = [
    {
        name: "윤팀장",
        num: 'j123456',
        dept: "인사관리 3팀",
        link: '../memberInfo'
    },
    {
        name: "김과장",
        num: 'g324216',
        dept: "리스크관리 1팀",
        link: '../memberInfo'

    },
    {
        name: "이대리",
        num: 'j34566',
        dept: "온라인 영업 1팀",
        link: '../memberInfo'

    },
    {
        name: "팽사원",
        num: 'j123456',
        dept: "자금운영 3팀",
        link: '../memberInfo'

    },
    {
        name: "윤팀장",
        num: 'j123456',
        dept: "회계관리 3팀",
        link: '../memberInfo'

    },
    {
        name: "윤팀장",
        num: 'j123456',
        dept: "인사관리 3팀",
        link: '../memberInfo'

    },
    {
        name: "김과장",
        num: 'g324216',
        dept: "온라인 영업 3팀",
        link: '../memberInfo'

    },
    {
        name: "이대리",
        num: 'j34566',
        dept: "인사관리 3팀",
        link: '../memberInfo'

    },
    {
        name: "팽사원",
        num: 'j123456',
        dept: "회계관리 3팀",
        link: '../memberInfo'

    },
    {
        name: "윤팀장",
        num: 'j123456',
        dept: "인사관리 3팀",
        link: '../memberInfo'

    }
]


export default SearchDept;
