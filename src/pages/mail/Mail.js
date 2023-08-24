
import React from 'react';
import '../../components/common/header/default.css';
import style from './Mail.module.css';

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import {
    callMailSelectAPI
} from '../../apis/MailAPICalls'


function Mail() {

    const dispatch = useDispatch();
    const mail = useSelector(state => state.mailReducer);
    const mailList = mail.data;
    const params = useParams();

    useEffect(
        () => {
            dispatch(callMailSelectAPI({	
                memberCode: params.memberCode
            }));            
        }
        ,[]
    );



    return (
        <>
                    <div className={ style.wrapper }>
                    <h1  style={{color: 'var(--color-text-title)', display: 'flex', padding: '20px' }}>
                        받은 메일함
                        <p>전체 메일 0 / 안읽은 메일 0</p>
                    </h1>
                    <div className={style.mailButton}>
                        <button >답장</button>
                        <button >삭제</button>
                        
                        
                        <input id={style.mailSearch} type="text" placeholder="검색"/>
                    </div>
            
                    <div className={style.mailLine}></div>

                    

                    <div className={style.mailContent}>

                    <div className={style.mailSubtitle}>
                        <div className={style.mailCheckbox}>▢</div>
                        <div className={style.mailName}>이름</div>
                        <div className={style.mailTitle}>제목</div>
                        <div className={style.mailDate}>날짜</div>
                    </div>

                        { mailList && mailList.map(
                            (mail) => (
                                <div key={ mail.mailCode }>
                                <input type="checkbox" className={style.mailCheckbox}/>
                                <div className={style.mailName}>{mail.memberCode}</div>
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

export default Mail;