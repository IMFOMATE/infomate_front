import React, {useContext} from 'react';
import NavStyle from "../common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";
import {Link} from "react-router-dom";
function ApprovalNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);

    return (
        <div className={`${menuState ? 'sidemenu': 'close sidemenu'}`}>
            <div className={NavStyle.sideTop}>
                <h1>전자결재</h1>
                <a href="/">글쓰기</a>
            </div>
            <div className={NavStyle.sideList}>
              <Link to='/approval/mylist'>내 기안문서</Link>
            </div>
        </div>
    );
}

export default ApprovalNav;