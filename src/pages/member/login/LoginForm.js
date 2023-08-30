import './loginForm.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

import {
    callLoginAPI
} from '../../../apis/MemberAPICalls'
// import { cs } from "@fullcalendar/core/internal-common";
function LoginForm() {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);

    const [form, setForm] = useState({
        memberID: '',
        memberPassword: ''
    });

    useEffect(() => {

        if (loginMember.status === 200) {
            console.log("[Login] Login SUCCESS {}", loginMember);
            navigate("/main", { replace: true });
        }
    }
        , [loginMember]);

    if (loginMember.length > 0) {
        console.log("[Login] Login is already authenticated by the server");
        return <Navigate to="/" />
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    

    const onClickLoginHandler = () => {
        dispatch(callLoginAPI({
            form: form
        }))
    }





    return (
        <div className="wrapper">
            <div className="alignForm">
                <h2 className="loginTitle">INFOMATE</h2>

                    <div>
                        <input
                            className="input1"
                            type="text"
                            id="username"
                            name="memberId"
                            required placeholder="사번"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <input
                            className="input1"
                            type="password"
                            id="password"
                            name="memberPassword"
                            required placeholder="비밀번호"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <button
                            className="btn1"
                            onClick={onClickLoginHandler}
                        >
                            로그인
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default LoginForm;