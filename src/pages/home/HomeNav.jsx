import React, {useContext} from 'react';
import NavStyle from "../../components/common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";
import Main from './Main';

function HomeNav() {
    const {menuState, toggleMenu} = useContext(MenuContext);
    return (


        <div className={NavStyle.hideSidemenu }>
            
        </div>
        

    );
}

export default HomeNav;