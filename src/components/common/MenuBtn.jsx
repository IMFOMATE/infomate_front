import NavStyle from './Nav.module.css';
import {MenuContext, MenuContextProvider} from "../../context/MenuContext";
import {useContext, useEffect, useState} from "react";
export default function MenuBtn(){
  const {menuState, toggleMenu} = useContext(MenuContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 480);
    }

    console.log(isMobile)

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);
  return (

        <>
            <span onClick={()=>toggleMenu()} className={`${NavStyle.menuBtn} `}>
                <div>
                    <span className={`material-symbols-outlined ${isMobile ? (menuState === true ? NavStyle.white : NavStyle.purple) : NavStyle.white}`}>
                        menu
                    </span>
                     <span className='none'>제목</span>
                </div>
            </span>
        </>
    )
}


