import NavStyle from './Nav.module.css';
import {MenuContext, MenuContextProvider} from "../../context/MenuContext";
import {useContext} from "react";
export default function MenuBtn(){

    const {menuState, toggleMenu} = useContext(MenuContext);

    console.log(menuState)
    return (

        <>
            <span onClick={()=> toggleMenu()} className={NavStyle.menuBtn}>
                <div>
                    <span className='material-symbols-outlined'>
                        menu
                    </span>
                     <span className='none'>제목</span>
                </div>
            </span>
        </>
    )
}


