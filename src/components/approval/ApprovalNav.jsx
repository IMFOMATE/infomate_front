import React, {useContext} from 'react';
import NavStyle from "../common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";
import Navlist from "../common/Navlist";
import {useModal} from "../../context/ModalContext";
import {useNavigate} from "react-router-dom";
function ApprovalNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);
    const { isModalOpen, toggleModal } = useModal('documentKind'); // 모달 별 상태가져오기
    const navigate = useNavigate();

    return (
        <div className={`${NavStyle.sidemenu} ${menuState ? '': NavStyle.close}`}>
            <div className={NavStyle.sideTop}>
                <h2 className={NavStyle.title} style={{cursor:'pointer'}} onClick={()=> navigate('/approval')}>전자결재</h2>
                <button className={NavStyle.new} onClick={toggleModal}>새 결재 작성</button>
            </div>
            <div className={NavStyle.sideList}>
              <Navlist title="개인 문서함" data={approvalLink}/>
              <Navlist title="부서 문서함" data={deptLink}/>
            </div>
        </div>
    );
}

export default ApprovalNav;

const approvalLink = [
  {text:'기안문서', link:'approval/approval?status='},
  {text:'참조문서', link:'approval/ref?status='},
  {text:'임시저장문서', link:'approval/temporary?status='},
  {text:'결재대기문서', link:'approval/credit'},
]

const deptLink = [
  {text:'기안완료함', link:'approval/dept'},
]