import ReminderList from "../../components/calendar/dashboard/ReminderList";
import MiniCalendar from '../../components/calendar/dashboard/MiniCalendar';
import { decodeJwt } from '../../util/tokenUtils';
import MainStyle from './Main.module.css';
import styles from '../../components/common/main.module.css';
import {useDispatch, useSelector} from "react-redux";
import {GET_CREDIT} from "../../modules/HomeModules";
import ApprovalTop from "../../components/approval/ApprovalTop";
import {useEffect} from "react";
import {getMainCredit} from "../../apis/HomeAPICalls";
import {NavLink, Navigate, useNavigate, Link} from 'react-router-dom';
import AnonyMini from '../../components/board/AnonyMini';
import Weather from "./Weather";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ButtonOutline from "../../components/common/button/ButtonOutline";
import WorkMini from "../../components/work/WorkMini";

function Main() {
    const dispatch = useDispatch();
    const documentData = useSelector(state => state.homeMainReducer[GET_CREDIT]);
    const navigate = useNavigate();
    
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    console.log("documentData", documentData)
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
                <div className={`${styles.maintitle} ${MainStyle.regi_title}`}>
                    <h2>메인페이지</h2>

                {
                    decoded === "ROLE_ADMIN" &&
                    <ButtonOutline value="회원등록" style={{marginRight:'30px'}} onClick={() => {navigate("regist-member", { replace: false })}}/>
                }
                </div>
                <div className={MainStyle.content}>
                    <div className={`${MainStyle.home_content} ${MainStyle.item1}`}>
                            <WorkMini/>
                    </div>
                    <div className={`${MainStyle.home_content} ${MainStyle.item2}`}>
                        <Weather/>
                    </div>
                    <div className={`${MainStyle.home_content} ${MainStyle.item3}`}>
                        <div className={MainStyle.home_title_wrap}>
                            <h2>일정</h2>
                            <Link to={'/calendar'}><NavigateNextIcon/></Link>
                        </div>
                        <div className={MainStyle.calendar}>
                            <div style={{width:'100%'}}>
                                <MiniCalendar />
                            </div>
                            <div className={MainStyle.reminder}>
                                <h3>
                                    부서일정
                                </h3>
                                <ReminderList />
                            </div>
                        </div>
                    </div>
                    <div className={`${MainStyle.home_content} ${MainStyle.item4}`}>
                        <div className={MainStyle.home_title_wrap}>
                            <h2>메일</h2>
                            <Link to={'/mail'}><NavigateNextIcon/></Link>
                        </div>
                        {/* 메일 */}
                    </div>
                    <div className={`${MainStyle.home_content} ${MainStyle.item5}`}>
                        <div className={MainStyle.home_title_wrap}>
                            <h2>결재대기</h2>
                            <Link to={'/approval'}><NavigateNextIcon/></Link>
                        </div>
                        <div className={MainStyle.credit_content}>
                            <div className={MainStyle.credit_top}>
                                <div className={MainStyle.line}>
                                    <Link to={'/approval/credit'}>
                                        <h3>
                                            결재대기문서
                                        </h3>
                                        <p>{documentData?.data?.creditCount || 0}</p>
                                    </Link>
                                </div>
                                <div className={MainStyle.line}>
                                    <Link to={'/approval/approval'}>
                                        <h3>
                                            기안문서
                                        </h3>
                                        <p>{documentData?.data?.approvalCount || 0}</p>
                                    </Link>
                                </div>
                                <div>
                                    <Link to={'/approval/approval?status=APPROVAL'}>
                                        <h3>
                                            결재완료문서
                                        </h3>
                                        <p>{documentData?.data?.doneList || 0}</p>
                                    </Link>
                                </div>
                            </div>
                            <div className={MainStyle.approval}>
                                <ApprovalTop data={documentData?.data?.creditList}/>
                            </div>
                        </div>
                    </div>
                    <div className={`${MainStyle.home_content} ${MainStyle.item6}`}>
                        <div className={MainStyle.home_title_wrap}>
                            <h2>게시판</h2>
                        </div>
                            <AnonyMini />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;
