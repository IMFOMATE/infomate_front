import React, {useContext, useEffect} from 'react';
import Navbar from "./Navbar";
import NavStyle from './Nav.module.css';
import Board from "../../pages/board/Board";
import ApprovalNav from "../approval/ApprovalNav";
import {CurrentTitleContext} from "../../context/CurrentTitleContext";
import HomeNav from "../../pages/home/HomeNav";
import {MenuContext} from "../../context/MenuContext";
import CalendarNav from '../../pages/calendar/CalendarNav';
import GroupNav from '../../pages/manage/GroupNav';
import ContactNav from "../contact/ContactNav"
import { useLocation, useParams } from 'react-router-dom';



function Header() {
    const {currentTitle, toggleTitle } = useContext(CurrentTitleContext);
    const {menuState, toggleMenu} = useContext(MenuContext);

    const menu = useLocation().pathname.split('/')[1];

    return (
        <header className={`${menuState === false ? NavStyle.close : ''}`}>
            <Navbar/>

            {/* {
                currentTitle === 'Home' && <HomeNav/> ||
                currentTitle === 'Board' && <Board/> ||
                currentTitle === 'Approval' && <ApprovalNav/> ||
                currentTitle === 'Group' && <GroupNav/> ||
                currentTitle === 'Contact' && <ContactNav /> ||
                currentTitle === 'Schedule' && <CalendarNav/>
            } */}
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