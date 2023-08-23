import React from "react";
// import DeptCss from "./SearchDept.module.css";
import SdeptCss from "./SearchDept.module.css";





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
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">이름</th>
                                    <th scope="col">사원번호</th>
                                    <th scope="col">부서명</th>
                                    <th scope="col">정보</th>
                                </tr>
                            </thead>    
                            <tbody>
                                <tr>
                                    <td>홍길동</td>
                                    <td>j123455</td>
                                    <td>인사관리 2팀</td>
                                    <td><button>보기</button></td>
                                </tr>
                                <tr>
                                    <td>홍길동</td>
                                    <td>j123455</td>
                                    <td>인사관리 3팀</td>
                                    <td><button>보기</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )

}




export default SearchDept;
