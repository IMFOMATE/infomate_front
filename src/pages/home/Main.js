import ReminderList from "../../components/calendar/dashboard/ReminderList";
import MiniCalendar from '../../components/calendar/dashboard/MiniCalendar';
import { decodeJwt } from '../../util/tokenUtils';
import MainStyle from './Main.module.css';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

function Main() {

    const navigate = useNavigate();

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null){
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
    }

    console.log('decoded ', decoded);

    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    if(token === undefined || token === null || token.exp * 1000 < Date.now()) {
        return <Navigate to="/" />;
    }


    return (
        <>
            <div className={MainStyle.home_wrap}>
                <div className={MainStyle.header}>
                    <h3>메인페이지</h3>
                    {/* { decoded === "ROLE_ADMIN" && <div className={MainStyle.regist}><NavLink to="/main/regist-member">회원 등록</NavLink></div> } */}
                { decoded === "ROLE_ADMIN" && <button className={MainStyle.regist} onClick={() => {navigate("regist-member", { replace: false })}}>회원 등록</button> }
                </div>
                <div className={MainStyle.content}>
                    <div>
                        {/*다른컴포넌트*/}
                    </div>
                    <div className={MainStyle.calendar}>
                        <ReminderList />
                        <MiniCalendar />
                    </div>
                    <div>
                        {/*다른 컴포넌트*/}
                    </div>
                    <div>
                        {/*다른 컴포넌트*/}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;
