import React , {useEffect} from 'react';
import {  useParams,  useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import InfoCss from './Info.module.css';
import GroupCss from './Group.module.css';

import {
    callEmployeeInfoAPI
} from '../../apis/EmployeeAPI';





function SimpleInfo (data){


    const dispatch = useDispatch();
    const params = useParams();
    const member = useSelector(state => state.employeeReducer);
    const navigate =  useNavigate();

    useEffect(              // 직원 정보 조회
    () => {
        // if(member) return;
        dispatch(callEmployeeInfoAPI({
            memberCode: params.memberCode
        }))
    }
    ,[]
    );

    console.log("CustomNode에서 받아온 SimpleInf 값확인 ", data);



    return(

        <>
        <div className={`wrap ${GroupCss.wrap}`}>
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
                            <td>{member.memberName}<pre/>{member.rankName}</td>
                        </tr>
                        <tr>
                            <th>부서</th>
                            <td>{member.rank.deptName}</td>
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
                    </tbody>
                </table>
            </div>
        </div>
        </>

    );
}

export default SimpleInfo;