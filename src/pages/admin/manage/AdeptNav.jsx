import React, {useContext} from 'react';
import NavStyle from "../../components/common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";
import {Link} from "react-router-dom";
import Navlist from "../../components/common/Navlist";
function AdeptNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);

    return (
        <div className={`${NavStyle.sidemenu} ${menuState ? '': NavStyle.close}`}>
            <div className={NavStyle.sideTop}>
                <h1>조직도</h1>
                <a href="/">내 부서조회</a>
            </div>
            <div className={NavStyle.sideList}>
                <Navlist title="조직도조회" data={GroupLink}/>
            </div>
        </div>
    );
}

export default AdeptNav;

const GroupLink = [
    {text:'전체조직도', link:'/manage'},
    {text:'부서조회', link:'/searchDept'},
    {text:'직원조회', link:'/manage'},



]