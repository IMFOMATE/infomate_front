import * as React from 'react';
// import { NavLink } from "react-router-dom";
import NavStyle from './Nav.module.css';
import {useContext} from "react";
import {MenuContext} from "../../context/MenuContext";

function Sidebar() {
    const {menuState, toggleMenu} = useContext(MenuContext);


    return (
        <div className={`${menuState ? '' : NavStyle.close } ${NavStyle.nav} `}>
            <div className={NavStyle.sideTop}>
                <h1>제목</h1>
                <a href="/">글쓰기</a>
            </div>
            <div className={NavStyle.sideList}>
            </div>
        </div>
    )
}


export default Sidebar;