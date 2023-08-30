import React, {useContext, useState} from 'react';
import NavStyle from "../common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";
import Navlist from "../common/Navlist";
import {useModal} from "../../context/ModalContext";
function ApprovalNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);
    const { isModalOpen, toggleModal } = useModal('documentKind'); // 모달 별 상태가져오기

    return (
        <div className={`${NavStyle.sidemenu} ${menuState ? '': NavStyle.close}`}>
            <div className={NavStyle.sideTop}>
                <h2 className={NavStyle.title}>전자결재</h2>
                <button className={NavStyle.new} onClick={toggleModal}>새 결재 작성</button>
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