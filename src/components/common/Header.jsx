import React, {useContext} from 'react';
import Navbar from "./Navbar";
import NavStyle from './Nav.module.css';
import Board from "../../pages/board/Board";
import ApprovalNav from "../../pages/approval/ApprovalNav";
import {CurrentTitleContext} from "../../context/CurrentTitleContext";
import HomeNav from "../../pages/home/HomeNav";
import {MenuContext} from "../../context/MenuContext";
import GroupNav from '../../pages/manage/GroupNav';

function Header() {
    const {currentTitle, toggleTitle } = useContext(CurrentTitleContext);
    const {menuState, toggleMenu} = useContext(MenuContext);
    return (
        <header className={`${menuState === false ? NavStyle.close : ''}`}>
            <Navbar/>

            {
                currentTitle === 'Home' && <HomeNav/> ||
                currentTitle === 'Board' && <Board/> ||
                currentTitle === 'Approval' && <ApprovalNav/> ||
                currentTitle === 'Group' && <GroupNav/>
            }

        </header>
    );
}

export default Header;