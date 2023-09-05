import LoginStyle from './LoginStyle.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { callLoginAPI } from '../../../apis/MemberAPICalls';
import { POST_LOGIN } from '../../../modules/MemberModule';

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);

    const [form, setForm] = useState({
        memberId: '',
        memberPassword: '',
    });

    useEffect(() => {
        // 로그인이 성공하면 메인 페이지로 이동
        if (loginMember.status === 200) {
            console.log("[Login] Login SUCCESS", loginMember);
            navigate("/main", { replace: true });
            
            alert(loginMember.data.memberName + "님 환영합니다.");

            // console.log(loginMember.data);

            localStorage.setItem('authToken', loginMember.data.token);

            // dispatch({
            //     type: POST_LOGIN,
            //     payload: loginMember.data,
            // });

        } else if (loginMember.status === 400) {
            console.log("[Login] Login FAILED: Incorrect id or password");
            alert(loginMember.message);
        }
    }, [loginMember]);

    // 이미 로그인된 경우 홈 화면으로 이동
    if (loginMember.length > 0) {
        console.log("[Login] Login is already authenticated by the server");
        return <Navigate to="/" />;
    }

    // 입력 필드 변경 시
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // 로그인 버튼 클릭 시
    const onClickLoginHandler = () => {
        dispatch(callLoginAPI({
            form: form
        }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onClickLoginHandler();
        }
    }

    return (
        <div className={LoginStyle.wrapper}>
            <div className={LoginStyle.alignForm}>
                <h2 className={LoginStyle.loginTitle}>INFOMATE</h2>

                <div>
                    <input
                        className={LoginStyle.input1}
                        type="text"
                        id="username"
                        name="memberId"
                        required
                        placeholder="사번"
                        onChange={onChangeHandler}
                        onKeyUp={handleKeyPress}
                    />
                </div>
                <div>
                    <input
                        className={LoginStyle.input1}
                        type="password"
                        id="password"
                        name="memberPassword"
                        required
                        placeholder="비밀번호"
                        onChange={onChangeHandler}
                        onKeyUp={handleKeyPress}
                    />
                </div>
                <div>
                    <button
                        className={LoginStyle.btn1}
                        onClick={onClickLoginHandler}
                    >
                        로그인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
