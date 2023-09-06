import React, {useContext } from 'react';
import Navbar from "./Navbar";
import NavStyle from './Nav.module.css';
import Board from "../board/BoardNav";
import ApprovalNav from "../approval/ApprovalNav";
import {CurrentTitleContext} from "../../context/CurrentTitleContext";
import HomeNav from "../../pages/home/HomeNav";
import {MenuContext} from "../../context/MenuContext";
import CalendarNav from '../../pages/calendar/CalendarNav';
import GroupNav from '../../pages/manage/GroupNav';
import ContactNav from "../contact/ContactNav"
import { useLocation } from 'react-router-dom';
import WorkNav from '../../pages/work/WorkNav';



function Header() {
    const {menuState, toggleMenu} = useContext(MenuContext);
    const isLogin = window.localStorage.getItem('accessToken');


    const menu = useLocation().pathname.split('/')[1];

    return (
        <header className={`${menuState === false ? NavStyle.close : ''}`}>
            <Navbar/>

            {
                menu === '' && <HomeNav/> ||
                menu === 'board' && <Board/> ||
                menu === 'approval' && <ApprovalNav/> ||
                menu === 'group' && <GroupNav/> ||
                menu === 'contact' && <ContactNav /> ||
                menu === 'calendar' && <CalendarNav/>
            }

        </header>
    );
}

export default Header;


