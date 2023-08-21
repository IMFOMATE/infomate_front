import React from 'react';
import Header from "../components/common/Header";
import {Outlet} from "react-router-dom";
import Default from "./Default.css"
import NavStyle from '../components/common/Nav.module.css';
import MenuBtn from "../components/common/MenuBtn";
import {CurrentTitleProvider} from "../context/CurrentTitleContext";
import {MenuContextProvider} from "../context/MenuContext";

export default function Layout() {
    return (
        <>

            <MenuContextProvider>
                <CurrentTitleProvider>
                    <div className={Default.wrapper}>
                        <MenuBtn/>
                        <div className={NavStyle.flex}>
                        
                            <Header/>
                            <main>
                                <Outlet/>
                            </main>
                        </div>
                    </div>
                </CurrentTitleProvider>
            </MenuContextProvider>

        </>
    );
}
