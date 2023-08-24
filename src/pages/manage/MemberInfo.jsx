import * as React from 'react';
import GroupCss from './Group.module.css';
import {Link} from "react-router-dom";
import InfoCss from "./Info.module.css";


function MemberInfo(){

    return(
        <>
            <main className={`main ${GroupCss.main}`}>
                <h1>인사기본정보</h1>
                <div className={`infoWrap ${InfoCss.infoWrap}`}>
                    <div className={`empInfo ${InfoCss.empInfo}`}>
                        <img className={`empImage ${InfoCss.empImage}`} alt='empImage' src='img/user.jpg'/>                               
                        <input type='file' className={`imgFile ${InfoCss.imgFile}`}/>
                        <p>* 사진은 자동으로 150x150 사이즈로 적용됩니다.</p>
                    </div>
                    <div className={`empSign ${InfoCss.empSign}`}>
                        <table>
                            <tbody className={`empBody ${InfoCss.empBody}`}>
                                <tr>
                                    <th>이름</th>
                                    <td>홍길동</td>
                                </tr>
                                <tr>
                                    <th>사번</th>
                                    <td>CoNum1234</td>
                                </tr>
                                <tr>
                                    <th>부서</th>
                                    <td>리스크 관리 3팀</td>
                                </tr>
                                <tr>
                                    <th>직위</th>
                                    <td>대표이사</td>
                                </tr>
                                <tr>
                                    <th>이메일</th>
                                    <td>CoNum1234@gmail.com</td>
                                </tr>
                                <tr>
                                    <th>Cell.</th>
                                    <td>010-1234-5676</td>
                                </tr>
                                <tr>
                                    <th>Dir.</th>
                                    <td>070-0987-4754</td>
                                </tr>
                                <tr>
                                    <th>생년월일</th>
                                    <td>1001-09-21</td>
                                </tr>
                                <tr>
                                    <th>주소</th>
                                    <td>경기도 고양시 일산 서구 일산로</td>
                                </tr>
                                <tr>
                                    <th>입사일</th>
                                    <td>2023-01-01</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={`checkBnt ${InfoCss.checkBnt}`}>
                    <button><a href='/searchDept'>확인</a></button>
                    {/* <button>취소</button> */}
                    </div>
                </div>
                

            </main>
        </>
    )


}



export default MemberInfo;