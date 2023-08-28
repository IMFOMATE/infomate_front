import React, {useContext} from 'react';
import NavStyle from "../../components/common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";

function BoardNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);

    return (
        <div className={`${menuState ? 'sidemenu': 'close sidemenu'}`}>
            <div className={NavStyle.sideTop}>
                <h1>Board</h1>
                <a href="/">글쓰기</a>
            </div>
            <div className={NavStyle.sideList}>

            </div>
        </div>
    );
}

export default BoardNav;