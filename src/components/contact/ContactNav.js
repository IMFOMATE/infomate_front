import { MenuContext } from "../../context/MenuContext";
import NavStyle from "../common/Nav.module.css";
import Navlist from "../common/Navlist";
import React, {useContext} from 'react';

function ContactNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);

    return (
        <div className={`${NavStyle.sidemenu} ${menuState ? '': NavStyle.close}`}>
            <div className={NavStyle.sideTop}>
                <h1>전체주소록</h1>
                <a href="/">연락처 추가</a>
            </div>
            <div className={NavStyle.sideList}>
              <Navlist title="전체주소록" data={ContactLink}/>
            </div>
        </div>
    );
}


export default ContactNav;

const ContactLink = [
    {text:'전체주소록', link:'/addressBook'},
    {text:'참조문서', link:'/approval/reflist'},
    {text:'임시저장문서', link:'/approval/temp'},
    {text:'결재대기문서', link:'/approval/approving'},
    {text:'결재완료문서', link:'/approval/approved'},
  ]