import React, {useContext} from 'react';
import NavStyle from "../../components/common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";

function ApprovalNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);

    return (
        <div className={`${menuState ? 'sidemenu': 'close sidemenu'}`}>
            <div className={NavStyle.sideTop}>
                <h1>Approval</h1>
                <a href="/">글쓰기</a>
            </div>
            <div className={NavStyle.sideList}>

            </div>
        </div>
    );
}

export default ApprovalNav;