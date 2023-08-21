import React from 'react';
import '../../components/common/header/default.css';
import style from './AddressBook.module.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

function AddressBook() {

    const dispatch = useDispatch();
    const contact = useSelector(state => state.contactReducer);
    const contactList = contact.data;

    return (
        <>
                <div className= 'wrapper' >
                    <h1 style={{color:'var(--color-text-title)'}}>전체 주소록</h1>
                    <div className={ style.addressSearch }>
                        <div className={style.addressText}>이름</div>
                        <div className={style.addressText}>전화번호</div>
                        <div className={style.addressText}>메모</div>
                    </div>

                <div className= {style.addressButton}>
                    <button style={{fontWeight: '800', fontSize: '15px', color: 'black'}}>전체</button>
                    <button>ㄱ</button>
                    <button>ㄴ</button>
                    <button>ㄷ</button>
                    <button>ㄹ</button>
                    <button>ㅁ</button>
                    <button>ㅂ</button>
                    <button>ㅅ</button>
                    <button>ㅇ</button>
                    <button>ㅈ</button>
                    <button>ㅊ</button>
                    <button>ㅋ</button>
                    <button>ㅌ</button>
                    <button>ㅍ</button>
                    <button>ㅎ</button>
                </div>

                <div className={style.addressSubtitle}>
                    <div className={style.addressName}>이름</div>
                    <div className={style.addressPhone}>휴대폰</div>
                    <div className={style.addressEmail}>이메일</div>
                    <div className={style.addressMemo}>메모</div>
                </div>

                <div className={style.addressContent}>
                    { contactList && contactList.map(
                        )}
                    <div className={style.addressName}>이기원</div>
                    <div className={style.addressPhone}>010-1234-5678</div>
                    <div className={style.addressEmail}>giwon@naver.com</div>
                    <div className={style.addressMemo}>ㅁㄴㅇㅁㄶ</div>
                </div>

                </div>
        </>    
    )


}

export default AddressBook;