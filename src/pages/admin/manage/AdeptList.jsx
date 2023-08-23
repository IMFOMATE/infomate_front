import React from "react";
import SdeptCss from "./SearchDept.module.css";

function AdeptList({data}) {

    return(
        data.map(e =>
            <div className={`deptList ${SdeptCss.deptList}`}>
                    <table>
                        <th scope="col">이름</th>
                        <th scope="col">사원번호</th>
                        <th scope="col">부서명</th>
                        <th scope="col">수정</th>
                        <tr  key={(e.num)}>
                            <td>홍길동</td>
                            <td>j123455</td>
                            <td>인사관리 3팀</td>
                            <td><button>수정</button></td>
                        </tr>
                        
                </table>
            </div>
            )
    );
}


export default AdeptList;
