import React, {useContext} from 'react';
import NavStyle from "../common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";
import {Link} from "react-router-dom";
import Navlist from "../common/Navlist";
function ApprovalNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);

    return (
        <div className={`${NavStyle.sidemenu} ${menuState ? '': NavStyle.close}`}>
            <div className={NavStyle.sideTop}>
                <h1>전자결재</h1>
                <a href="/">새 결재 작성</a>
            </div>
            <div className={NavStyle.sideList}>
              <Navlist title="내 결재함" data={approvalLink}/>
            </div>
        </div>
    );
}

export default ApprovalNav;

const approvalLink = [
  {text:'기안문서', link:'/approval/mylist'},
  {text:'참조문서', link:'/approval/reflist'},
  {text:'임시저장문서', link:'/approval/temp'},
  {text:'결재대기문서', link:'/approval/approving'},
  {text:'결재완료문서', link:'/approval/approved'},
]