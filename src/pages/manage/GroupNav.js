import React, {useContext} from 'react';
import NavStyle from "../../components/common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";
// import { Link } from "react-router-dom";
import Navlist from "../../components/common/Navlist";
function GroupNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);

    return (
        <div className={`${NavStyle.sidemenu} ${menuState ? '': NavStyle.close}`}>
            <div className={NavStyle.sideTop}>
                <h1>조직도</h1>
                {/* <a href="updateDept" className={NavStyle.new}>조직도수정</a> */}
            </div>
            <div className={NavStyle.sideList}>
                <Navlist title="조직도조회" data={GroupLink}/>
            </div>
        </div>
    );
}

export default GroupNav;

const GroupLink = [
    {text:'전체조직도', link:'/group'},
    {text:'직원전체조회', link:'group/searchDept'},
    {text:'부서수정', link:'group/updateDept'},



]