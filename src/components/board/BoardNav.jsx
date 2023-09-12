import React, {useContext, useState} from 'react';
import NavStyle from "../common/Nav.module.css";
import {MenuContext} from "../../context/MenuContext";
import Navlist from "../common/Navlist";
import {useModal} from "../../context/ModalContext";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from "react";
function BoardNav() {

    const {menuState, toggleMenu} = useContext(MenuContext);
    const {modalOpen , toggleModal } = useModal();

    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const boards  = useSelector(state => state.boardReducer);      
    // const boardList = boards?.data; 
    // console.log("boardManagement", boardList);


    const onClickBoardInsert = () => {
      console.log('[BoardManagement] onClickBoardInsert');
      navigate("/board/posting", { replace: false })
  }

    return (
        <div className={`${NavStyle.sidemenu} ${menuState ? '': NavStyle.close}`}>
            <div className={NavStyle.sideTop}>
                <h2 className={NavStyle.title}>게시판</h2>
                <button className={NavStyle.new} onClick={ onClickBoardInsert }>글쓰기</button>
            </div>
            <div className={NavStyle.sideList}>
              <Navlist title="공지 게시판" data={noticeLink}/><br/>
              <Navlist title="커뮤니티 게시판" data={boardLink}/><br/>
              <Navlist title="부서 게시판" data={deptLink}/><br/>
            </div>
        </div>
    );
}

export default BoardNav;

const noticeLink = [
  {text:'공지사항', link:'/board/notice'},
]
const boardLink = [
  {text:'최근게시글', link:'/board/newpost'},
  {text:'일반게시판', link:'/board/common'},
  {text:'익명게시판', link:'/board/anony'},
]
const deptLink = [
  {text:'부서게시판', link:'/board/brddept'},
]