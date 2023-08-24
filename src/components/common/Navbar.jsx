import * as React from 'react';
import NavStyle from './Nav.module.css';
import {useContext} from "react";
import {CurrentTitleContext} from "../../context/CurrentTitleContext";
import {NavLink} from "react-router-dom";
import {MenuContext} from "../../context/MenuContext";



function Navbar() {
    const {currentTitle, toggleTitle } = useContext(CurrentTitleContext);
    const {menuState, toggleMenu } = useContext(MenuContext);


    return (
        <nav className={`${NavStyle.nav} ${menuState ? '' : NavStyle.close }`}>
            <div className={`${NavStyle.profile} ${menuState ? '' : NavStyle.close }`}>
                <a href="/">
                    <img className={NavStyle.profileImg} alt='profileImg' src='img/user.jpg'/>
                </a>
                <div className={NavStyle.profileInfo}>
                    <p>하이미디어 부서</p>
                    <p>홍길동 사원</p>
                </div>
            </div>
            <ul className=''>
                <li className='' onClick={()=>toggleTitle("Group")}>
                    <NavLink to="/" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            home
                        </span>
                        <span>홈</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Board")}>
                    <NavLink to="/board" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            developer_board
                        </span>
                        <span>게시판</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Schedule")}>
                    <NavLink to="/calendar" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            calendar_today
                        </span>
                        <span>스케쥴</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Approval")}>
                    <NavLink to="/approval" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            approval
                        </span>
                        <span>전자결재</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Attend")}>
                    <NavLink to="" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            approval
                        </span>
                        <span>근태관리</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Mail")}>
                    <NavLink to="" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            mail
                        </span>
                        <span>메일</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Group")}>
                    <NavLink to="/group" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            group
                        </span>
                        <span>조직도</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Address")}>
                    <NavLink to="" >
                        <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            library_books
                        </span>
                        <span>주소록</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Alarm")}>
                    <NavLink to="" >
                       <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            notifications
                        </span>
                        <span>알림</span>
                    </NavLink>
                </li>
                <li onClick={()=>toggleTitle("Chat")}>
                    <NavLink to="" >
                       <span className={`material-symbols-outlined icon ${NavStyle.icon}`}>
                            mode_comment
                        </span>
                        <span>채팅</span>
                    </NavLink>
                </li>
            </ul>
            <div className={NavStyle.logout}>
                <a href='/'>
                    로그아웃
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
