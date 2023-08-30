import React from 'react';
import Header from "../components/common/Header";
import {Outlet} from "react-router-dom";
import NavStyle from '../components/common/Nav.module.css';
import MenuBtn from "../components/common/MenuBtn";
import {CurrentTitleProvider} from "../context/CurrentTitleContext";
import {MenuContextProvider} from "../context/MenuContext";
import {ModalContextProvider} from "../context/ModalContext";
import { CalendarFilterProvider } from '../context/CalendarContext';
import Modal from "../components/approval/ele-component/common/Modal";
import DragAndDropWrapper from "../components/approval/ele-component/treeview/DragAndDropWrapper";

export default function Layout() {

    return (
        <>
            <ModalContextProvider>
                <MenuContextProvider>
                    <CurrentTitleProvider>
                        <DragAndDropWrapper>
                            <CalendarFilterProvider>
                                <LayoutContent/>
                            </CalendarFilterProvider>
                        </DragAndDropWrapper>
                    </CurrentTitleProvider>
                </MenuContextProvider>
            </ModalContextProvider>
        </>
    );

}

function LayoutContent() {


    return (
        <div className='wrapper'>
            <MenuBtn />
            <div className={NavStyle.flex}>
                <Header />
                <main>
                    <Outlet/>
                </main>
            </div>
            <Modal modalId="documentKind" title="결재양식 선택" />
        </div>
    );
}
