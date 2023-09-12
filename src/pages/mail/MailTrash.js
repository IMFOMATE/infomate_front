
import React from 'react';
import style from './Mail.module.css';

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import {
    callSelectTrashAPI , callDeleteTrashAPI , callUpdateTrashAPI
} from '../../apis/MailAPICalls'


function MailTrash({title}) {

    const dispatch = useDispatch();
    const mail = useSelector(state => state.mailTrashReducer);
    const mailList = mail.data || { matchingEmails: [] };
    const params = useParams();

    
    console.log("mailList" , mailList);

    const authTokenJSON = localStorage.getItem('authToken');

   // JSON 형식의 데이터를 JavaScript 객체로 파싱
    const authToken = JSON.parse(authTokenJSON);

    // 회원 코드를 가져옴
    const memberCode = authToken.memberCode;

    useEffect(
        () => {
            dispatch(callSelectTrashAPI({	
                memberCode: memberCode
            }));            
        }
        ,[]
    );

    const onClickDeleteHandler = () => {

        dispatch(callDeleteTrashAPI({
            memberCode: memberCode
        }))
    }

    const onClickPutHandler = () => {

        dispatch(callUpdateTrashAPI({
            memberCode : memberCode
        }))
    }



    return (
        <>
                    <div className={ style.wrapper }>
                    <h1  style={{color: 'var(--color-text-title)', display: 'flex', padding: '20px' }}>
                        {title}
                        
                    </h1>
                    <div className={style.mailButton}>
                        
                        <button id={style.mailSearch} onClick={ onClickDeleteHandler }>휴지통 비우기</button>
                        <button id={style.mailSearch} style={{ marginTop : "30px"}} onClick={ onClickPutHandler } >전체 복구하기</button>
                        

                    </div>
            
                    <div className={style.mailLine}></div>

                    

                    <div className={style.mailContent}>

                    <div className={style.mailSubtitle}>
                        
                        <div className={style.mailName}>이름</div>
                        <div className={style.mailTitle}>제목</div>
                        <div className={style.mailDate}>날짜</div>
                    </div>

                        { mailList.matchingEmails && mailList.matchingEmails.map(
                            (mail, index) => (
                                <div key={ mail.mailCode }>
                                
                                <div className={style.mailName}>{mailList.sendMemberName && mailList.sendMemberName[index].memberName}</div>
                                <div className={style.mailTitle}>{mail.mailTitle}</div>
                                <div className={style.mailDate}>{mail.mailDate}</div>
                                </div>
                            )
                        )}
                        

                        
                    </div>
                </div>
        </>    
    )
}

export default MailTrash;