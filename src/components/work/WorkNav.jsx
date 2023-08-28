import React, {useContext, useState} from 'react';
import NavStyle from "../common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";
import Navlist from "../common/Navlist";
import {useModal} from "../../context/ModalContext";
function WorkNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);
    const {modalOpen , toggleModal } = useModal();

    return (
        <div className={`${NavStyle.sidemenu} ${menuState ? '': NavStyle.close}`}>
            <div className={NavStyle.sideTop}>
                <h2 className={NavStyle.title}>근태 관리</h2>
                <button className={NavStyle.new}>글쓰기</button>
            </div>
            <div className={NavStyle.sideList}>
              <Navlist title="나의 근태 현황" data={myworkLink}/><br/>
              <Navlist title="부서 근태 현황" data={deptworkLink}/><br/>
            </div>
        </div>
    );
}

export default WorkNav;

const myworkLink = [
  {text:'근무 현황', link:'/work/dpet'},
  {text:'내 연차 정보', link:'/work/dept'},
]
const deptworkLink = [
  {text:'부서 근무 현황', link:'/work/mydept'},
]