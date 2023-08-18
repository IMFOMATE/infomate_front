import {createContext, useState} from "react";

export const MenuContext= createContext();

export function MenuContextProvider({children}){
    const [menuState, setMenuState] = useState(false);

    const toggleMenu = () => setMenuState(prev=> !prev);

    return(
        <MenuContext.Provider value={{menuState, toggleMenu}}>
            {children}
        </MenuContext.Provider>
    )

}