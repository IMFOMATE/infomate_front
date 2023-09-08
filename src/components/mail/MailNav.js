
import NavStyle from "../common/Nav.module.css";
import React, {useContext} from 'react';
import Navlist from "../common/Navlist";
import { Link  } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { MenuContext } from "../../context/MenuContext";

function MailNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/mail/mailWrite'); // 프로그래밍적인 페이지 이동
    };

    return (
        <div className={`${NavStyle.sidemenu} ${menuState ? '': NavStyle.close}`}>
            <div className={NavStyle.sideTop}>
                <h2 className={NavStyle.title}>메일</h2>
                <button className={NavStyle.new} onClick={handleButtonClick}>메일쓰기</button>
            </div>
            <div className={NavStyle.sideList}>
              <Navlist title="메일함" data={MailLink}/>
              <div style={{ marginTop: "20px"}}>
              <Navlist title="휴지통" data={trashLink}/>
              </div>
            </div>
        </div>
    );
}



export default MailNav;

const MailLink = [
    {text:'전체 메일함', link:'/mail/allMail'},
    {text:'안읽은 메일함', link:'/mail/unreadMail'},
    {text:'읽은 메일함', link:'/mail/readMail'},
    {text:'참조 메일함', link:'/mail/reference'}
    

  ]

const trashLink = [
    {text:'휴지통', link:'/mail/trash'}
]