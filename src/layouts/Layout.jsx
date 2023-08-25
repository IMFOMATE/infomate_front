import React from 'react';
import Header from "../components/common/Header";
import {Outlet} from "react-router-dom";
// import Default from './Default.css';
import NavStyle from '../components/common/Nav.module.css';
import MenuBtn from "../components/common/MenuBtn";
import {CurrentTitleProvider} from "../context/CurrentTitleContext";
import {MenuContextProvider} from "../context/MenuContext";
import {ModalContextProvider, useModal} from "../context/ModalContext";
import Modal from "../components/approval/ele-component/common/Modal";
import DragAndDropWrapper from "../components/approval/ele-component/treeview/DragAndDropWrapper";

export default function Layout() {

    return (
        <>
            <ModalContextProvider>
                <MenuContextProvider>
                    <CurrentTitleProvider>
                      <DragAndDropWrapper>
                        <LayoutContent/>
                      </DragAndDropWrapper>
                    </CurrentTitleProvider>
                </MenuContextProvider>
            </ModalContextProvider>
        </>
    );

}

function LayoutContent() {
    // const { isModalOpen } = useModal(); // 모달을 열기 위한 함수 가져오기

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
