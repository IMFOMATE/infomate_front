import ReminderList from "../../components/calendar/dashboard/ReminderList";
import MiniCalendar from '../../components/calendar/dashboard/MiniCalendar';
import { decodeJwt } from '../../util/tokenUtils';
import MainStyle from './Main.module.css';
import styles from '../../components/common/main.module.css';
import {NavLink, Navigate, useNavigate, Link} from 'react-router-dom';
import Clock from "./Clock";
import {useDispatch, useSelector} from "react-redux";
import {GET_CREDIT} from "../../modules/HomeModules";
import ApprovalTop from "../../components/approval/ApprovalTop";
import {useEffect} from "react";
import {getMainCredit} from "../../apis/HomeAPICalls";
import {LoadingSpiner} from "../../components/common/other/LoadingSpiner";

function Main() {
    const dispatch = useDispatch();
    const documentData = useSelector(state => state.homeMainReducer[GET_CREDIT]);
    const navigate = useNavigate();

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    console.log(documentData)
    if(isLogin !== undefined && isLogin !== null){
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
    }

    console.log('decoded ', decoded);

    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    useEffect(() => {
            dispatch(getMainCredit());
        },[]
    );

    if(token === undefined || token === null || token.exp * 1000 < Date.now()) {
        return <Navigate to="/" />;
    }

    // if(!documentData) return <LoadingSpiner />

    return (
        <>
            <div className={MainStyle.home_wrap}>
                <div className={styles.maintitle}>
                    <h2>메인페이지</h2>
                    {/* { decoded === "ROLE_ADMIN" && <div className={MainStyle.regist}><NavLink to="/main/regist-member">회원 등록</NavLink></div> } */}
                { decoded === "ROLE_ADMIN" && <button className={MainStyle.regist} onClick={() => {navigate("regist-member", { replace: false })}}>회원 등록</button> }
                </div>
                <div className={MainStyle.content}>
                    <div className={MainStyle.home_content}>
                        <Clock/>
                    </div>
                    <div className={MainStyle.home_content}>
                        <div className={MainStyle.home_title_wrap}>
                            <h2>Calendar</h2>
                            <Link to={'/calendar'}>더보기</Link>
                        </div>
                        <div className={MainStyle.calendar}>
                            <MiniCalendar />
                            <ReminderList />
                        </div>
                    </div>
                    <div className={MainStyle.home_content}>
                        <div className={MainStyle.home_title_wrap}>
                            <h2>결재대기</h2>
                            <Link to={'/approval'}>더보기</Link>
                        </div>
                        <ApprovalTop data={documentData.data}/>
                    </div>
                    <div className={MainStyle.home_content}>
                        <div className={MainStyle.home_title_wrap}>
                            <h2>0000</h2>
                            <Link to={'/approval'}>더보기</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;
