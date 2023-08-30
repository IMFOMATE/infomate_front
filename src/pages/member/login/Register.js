import RegisterCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

import {
    callRegisterAPI
} from '../../../apis/MemberAPICalls'

function Register() {

    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    const [form, setForm] = useState({
        memberId: '',
        memberPassword: '',
        memberName: '',
        memberEmail: '',
        memberPhone: '',
        memberNo: '',
        memberStatus: '',
        memberAddress: '',
        hireDate: '',
        department: '',
        memberPic: '',
        rankCode: '',
        memberOff: ''
    });
    useEffect(() => {
        if(member.status === 201){
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/login", { replace: true })
        }
    },
    [member]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };    

    const onClickBackHandler = () => {
        // 돌아가기 클릭시 메인 페이지로 이동
        navigate("/", { replace: true })
    }
    
    const onClickRegisterHandler = () => {
        dispatch(callRegisterAPI({
            form: form
        }));
    }

    return (
        <div className={ RegisterCSS.backgroundDiv}>
            <div className={ RegisterCSS.registerDiv }>
                <h1>회원등록</h1>
                <input 
                    type="text" 
                    name="memberId"
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="password"
                    name="memberPassword" 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="text" 
                    name="memberName"
                    placeholder="이름" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="text" 
                    name="memberEmail"
                    placeholder="이메일" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input
                    type="text"
                    name="memberPhone"
                    placeholder="핸드폰"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input
                    type="text"
                    name="memberNo"
                    placeholder="생년월일"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input
                    type="text"
                    name="memberStaus"
                    placeholder="재직여부"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input
                    type="text"
                    name="extensionNumber"
                    placeholder="내선번호"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input
                    type="text"
                    name="memberAddress"
                    placeholder="주소"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input
                    type="date"
                    name="hireDate"
                    placeholder="입사일"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input
                    type="number"
                    name="department"
                    placeholder="부서"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input
                    type="file"
                    name="memberPic"
                    placeholder="프로필사진"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input
                    type="number"
                    name="rankCode"
                    placeholder="직위"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input
                    type="number"
                    name="memberOff"
                    placeholder="보유연차"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <button
                    onClick = { onClickRegisterHandler }
                >   
                    회원등록
                </button>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}

export default Register;