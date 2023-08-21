import {createContext, useState} from "react";

export const CurrentTitleContext= createContext();

export function CurrentTitleProvider({children}){
    const [currentTitle, setCurrentTitle] = useState('Home');

    const toggleTitle = (newTitle) => setCurrentTitle(newTitle);

    return(
        <CurrentTitleContext.Provider value={{currentTitle, toggleTitle}}>
            {children}
        </CurrentTitleContext.Provider>
    )

}