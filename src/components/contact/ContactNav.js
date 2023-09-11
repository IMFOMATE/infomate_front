import { MenuContext } from "../../context/MenuContext";
import NavStyle from "../common/Nav.module.css";
import React, {useContext} from 'react';
import Navlist from "../common/Navlist";
import { Link  } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function ContactNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/addressBook/addContact'); // 프로그래밍적인 페이지 이동
    };

    return (
        <div className={`${NavStyle.sidemenu} ${menuState ? '': NavStyle.close}`}>
            <div className={NavStyle.sideTop}>
                <h2 className={NavStyle.title}>주소록</h2>
                <button className={NavStyle.new} onClick={handleButtonClick}>연락처 추가</button>
            </div>
            <div className={NavStyle.sideList}>
              <Navlist title="전체 주소록" data={ContactLink}/>
            </div>
        </div>
    );
}



export default ContactNav;

const ContactLink = [
    {text:'전체 연락처', link:'/addressBook/allAddressBook'},
    {text:'즐겨찾기', link:'/addressBook/like'},
    // {text:'거래처 연락처', link:'/addressBook/client'},
    

  ]