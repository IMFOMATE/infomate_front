import React, {useContext} from 'react';
import NavStyle from "../../components/common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";

function HomeNav() {
    const {menuState, toggleMenu} = useContext(MenuContext);
    return (


        <div className={NavStyle.sidemenu }>
            <div className={NavStyle.sideTop}>
                <h1>HOME</h1>
            </div>
            <div className={NavStyle.sideList}>

            </div>
        </div>
        

    );
}

export default HomeNav;