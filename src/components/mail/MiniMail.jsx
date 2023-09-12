
import React from 'react';
import style from '../../pages/mail/Mail.module.css';

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import {
    callMailSelectAPI, callDeleteMailAPI ,callUpdateStatusAPI
} from '../../apis/MailAPICalls';

import {
    callLoginAPI
}
from '../../apis/MemberAPICalls'
import ViewMail from '../../pages/mail/ViewMail';




function Mail({title}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mail = useSelector(state => state.mailReducer);
    const mailList = mail.data?.data || { matchingEmails: [] };
    const params = useParams();
    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);
    const [checkedItems, setCheckedItems] = useState({});
    const [checkedName , setCheckedName] = useState([]);
    const [checkedMail ,setCheckedMail] = useState({});

    

    const pageInfo = mail.data?.pageInfo || { pageEnd: 1 };

    const pageNumber = [];

    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd; i++){
            pageNumber.push(i);
        }
    }

    // console.log("loginMember" , loginMember);


    console.log("mailList" , mailList);

    const authTokenJSON = localStorage.getItem('authToken');

   // JSON 형식의 데이터를 JavaScript 객체로 파싱
    const authToken = JSON.parse(authTokenJSON);

    // 회원 코드를 가져옴
    const memberCode = authToken.memberCode;

    useEffect(
        () => {
            setStart((currentPage - 1) * 5);
            dispatch(callMailSelectAPI({
                memberCode: memberCode,
                currentPage : currentPage,
                title : title
                
            }));
        },[currentPage , title] );
    
    const onClickEventHandler = (mail, sendName) => {

        console.log("mail" , mail);
        console.log("sendName", sendName);

        navigate('/mail/viewMail', { state: { mail, sendName } });

        dispatch(callUpdateStatusAPI({
            mailCode : mail.mailCode
        }));

    }


    return (
        <>
                    <div className={ style.wrapper }>
                    <h1  style={{color: 'var(--color-text-title)', display: 'flex', padding: '20px' }}>
                        {title}
                        <p>전체 메일 0 / 안읽은 메일 0</p>
                    </h1>
            
                    <div className={style.mailLine}></div> 

                    <div className={style.mailContent}>

                    <div className={style.mailSubtitle}>
                        <div className={style.mailName}>이름</div>
                        <div className={style.mailTitle}>제목</div>
                        <div className={style.mailDate}>날짜</div>
                    </div>

                        { mailList.matchingEmails && mailList.matchingEmails.map(
                            (mail, index) => (
                                
                                <div key={ mail.mailCode } style={{ background: (mail.mailStatus === 'Y') ? "rgba(155,155,155,0.3)" : "" }}>
                                
                                <div className={style.mailName} onClick={ () => onClickEventHandler(mail, mailList.sendMemberName[index].memberName) }>
                                    {mailList.sendMemberName && mailList.sendMemberName[index].memberName}</div>
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