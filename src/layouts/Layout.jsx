import React from 'react';
import Header from "../components/common/Header";
import {Outlet, useNavigate} from "react-router-dom";
import NavStyle from '../components/common/Nav.module.css';
import MenuBtn from "../components/common/MenuBtn";
import {CurrentTitleProvider} from "../context/CurrentTitleContext";
import {MenuContextProvider} from "../context/MenuContext";
import {ModalContextProvider, useModal} from "../context/ModalContext";
import { CalendarFilterProvider } from '../context/CalendarContext';

import Modal from "../components/approval/ele-component/common/Modal";
import DragAndDropWrapper from "../components/approval/ele-component/treeview/DragAndDropWrapper";
import { decodeJwt } from '../util/tokenUtils';

export default function Layout() {

    const navigate = useNavigate();

    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log(token);

    if(token.exp * 1000 < Date.now()) {

        alert("로그인 세션이 만료되었습니다. 다시 로그인하여주십시오.")

        window.localStorage.removeItem("accessToken");
        navigate("/", {replace: true});
    }



    return (
        <>
            <ModalContextProvider>
                <MenuContextProvider>
                    <CurrentTitleProvider>
                        <DragAndDropWrapper>
                            <CalendarFilterProvider>
                                <LayoutContent/>
                            {/*<div className='wrapper'>*/}
                            {/*    <MenuBtn/>*/}
                            {/*    <div className={NavStyle.flex}>*/}
                            {/*        <Header/>*/}
                            {/*        <main>*/}
                            {/*            <Outlet/>*/}
                            {/*        </main>*/}
                            {/*    </div>*/}
                            {/*    <Modal/>*/}
                            {/*</div>*/}
                            </CalendarFilterProvider>
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
