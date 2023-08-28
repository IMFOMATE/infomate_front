import React, {useContext} from 'react';
import NavStyle from "../../components/common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";
import SideCSS from './WorkSide.module.css';
import Navlist from "../../components/common/Navlist";


function WorkNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);

    return (
        <div className={`${NavStyle.sidemenu} ${menuState ? 'sidemenu': 'close sidemenu'}`}>
            <div className={NavStyle.sideTop}>
            <h2 className={NavStyle.title}>근태관리</h2>
                
{/*  */}

            <div className={ SideCSS.wktimer }>12 : 30</div>
            <div className={ SideCSS.timer_ft }>출근시간 09 : 30</div>
            <div className={ SideCSS.timer_ft }>퇴근시간 18 : 30</div>

            <br />

            <div className={ SideCSS.dropdown }>
            <button className={ SideCSS.dropstate }>근무 상태 표시 ▼</button>
            <div className={SideCSS['dropdown-content']}>
            <a href="#">근무중</a>
            <a href="#">외근중</a>
            <a href="#">출장중</a>
            <a href="#">회의중</a>
            </div>
        </div>
    <div className={ SideCSS.wk_btn_margin }></div>

    <div className={ SideCSS.wk_btn_container }>
    <button className={ SideCSS.wk_wkoffbtn }>출근하기</button>
    <button className={ SideCSS.wk_wkoffbtn }>퇴근하기</button>
    </div>
    <br />


{/*  */}

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
    {text:'근무 현황', link:'/work'},
    {text:'내 연차 정보', link:'/work/mywork'},
  ]
  const deptworkLink = [
    {text:'우리 근무 현황', link:'/work/mydept'},
    {text:'부서 근무 현황', link:'/work/dept'},
  ]