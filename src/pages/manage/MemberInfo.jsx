import * as React from 'react';
import GroupCss from './Group.module.css';
// import {Link} from "react-router-dom";
import InfoCss from "./Info.module.css";
import {
    callEmployeeInfoAPI
} from '../../apis/EmployeeAPI';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {  useParams,  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FadeLoader } from "react-spinners";
import StylesLoading from '../calendar/loadingStyle.module.css';

function MemberInfo(){

    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const params = useParams();
    const member = useSelector(state => state.employeeReducer);
    const navigate =  useNavigate();
//     useEffect(              // 직원 정보 조회
//     () => {
//         if(member) return;
//         dispatch(callEmployeeInfoAPI({
//             memberCode: params.MEMBER_CODE
//         }))
//     }
//     ,[member]
// );

    useEffect(              // 직원 정보 조회
        () => {
            // if(member) return;
            dispatch(callEmployeeInfoAPI({
                memberCode: params.memberCode
            }))
        }
        ,[]
    );
        

    // 이전화면으로가기 버튼
    const BackHandler = () => { navigate(-1); }
    
    console.log(member);

    if(member.length === 0) return <div className={StylesLoading.loading}><FadeLoader color="#9F8AFB" /></div>


    return(
        <>
            <main className={`main ${GroupCss.main}`}>
                <h1>인사기본정보</h1>
                <div className={`infoWrap ${InfoCss.infoWrap}`}>
                    <div className={`empInfo ${InfoCss.empInfo}`}>
                        <img className={`empImage ${InfoCss.empImage}`} alt='empImage' src={member.memberPic}/>                               
                        {/* <input type='file' className={`imgFile ${InfoCss.imgFile}`}/> */}
                        {/* <p>* 사진은 자동으로 150x150 사이즈로 적용됩니다.</p> */}
                    </div>
                    <div className={`empSign ${InfoCss.empSign}`}>
                        <table>
                            <tbody className={`empBody ${InfoCss.empBody}`}>
                                <tr>
                                    <th>이름</th>
                                    <td>{member.memberName}</td>
                                </tr>
                                <tr>
                                    <th>사번</th>
                                    <td>{member.memberId}</td>
                                </tr>
                                <tr>
                                    <th>부서</th>
                                    <td>{member.department.deptName}</td>
                                </tr>
                                <tr>
                                    <th>직위</th>
                                    <td>{member.rank.rankName}</td>
                                </tr>
                                <tr>
                                    <th>이메일</th>
                                    <td>{member.memberEmail}</td>
                                </tr>
                                <tr>
                                    <th>Cell.</th>
                                    <td>{member.memberPhone}</td>
                                </tr>
                                <tr>
                                    <th>Dir.</th>
                                    <td>{member.extensionNumber}</td>
                                </tr>
                                <tr>
                                    <th>생년월일</th>
                                    <td>{member.memberNo}</td>
                                </tr>
                                <tr>
                                    <th>주소</th>
                                    <td>{member.memberAddress}</td>
                                </tr>
                                <tr>
                                    <th>입사일</th>
                                    <td>{member.hireDate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={`checkBnt ${InfoCss.checkBnt}`}>
                    <button onClick={BackHandler}>뒤로가기</button>
                    {/* <button>취소</button> */}
                    </div>
                </div>
                

            </main>
        </>
    )


}



export default MemberInfo;