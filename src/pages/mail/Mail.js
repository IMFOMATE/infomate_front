
import React from 'react';
import style from './Mail.module.css';

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import {
    callMailSelectAPI, callDeleteMailAPI ,callUpdateStatusAPI
} from '../../apis/MailAPICalls'

import dayjs from "dayjs";



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

    const yStatusEmails = mailList.matchingEmails.filter((mail) => mail.mailStatus === 'N');

    
    const yStatusEmailsCount = yStatusEmails.length;


    const date = dayjs(mailList.mailDate)
    
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

    const handleCheckboxChange = (mail ,sendName) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [mail]: !prevCheckedItems[mail]
        }));

        if(checkedItems) {
            setCheckedMail(mail)
            setCheckedName(sendName)

        }

        };

    const onClickReplyHandler = () => {

        if(checkedItems){
        navigate('/mail/mailWrite', { state: { checkedName } });
        }
    }

    const onClickDeleteHandler = () => {
        console.log("안녕", checkedMail.mailCode);
        if (Object.keys(checkedItems).length > 0) { // checkedItems에 체크된 항목이 있는지 확인
            dispatch(callDeleteMailAPI({
                mailCode : checkedMail.mailCode
            }));
        } else {
            console.log("선택된 메일이 없습니다."); // 선택된 메일이 없을 때 처리
        }
    }


    return (
        <>
                    <div className={ style.wrapper }>
                    <h1  style={{color: 'var(--color-text-title)', display: 'flex', padding: '20px' }}>
                        {title}
                        <p>전체 메일 {mailList.matchingEmails.length}  / 안읽은 메일 {yStatusEmailsCount}</p>
                    </h1>
                    <div className={style.mailButton}>
                        <button onClick={onClickReplyHandler}>답장</button>
                        <button onClick={ onClickDeleteHandler}>삭제</button>
                        
                        
                        {/* <input id={style.mailSearch} type="text" placeholder="검색"/> */}
                    </div>
            
                    <div className={style.mailLine}></div> 

                    

                    <div className={style.mailContent}>

                    <div className={style.mailSubtitle}>
                        <div className={style.mailCheckbox}>▢</div>
                        <div className={style.mailName}>이름</div>
                        <div className={style.mailTitle}>제목</div>
                        <div className={style.mailDate}>날짜</div>
                    </div>

                        { mailList.matchingEmails && mailList.matchingEmails.map(
                            (mail, index) => (
                                
                                <div key={ mail.mailCode } style={{ background: (mail.mailStatus === 'Y') ? "rgba(155,155,155,0.1)" : "" }}>
                                <input type="checkBox" className={style.mailCheckbox} checked={checkedItems[mail.mailCode]}
                                        onChange={() => handleCheckboxChange(mail,mailList.sendMemberName[index].memberName)}/>
                                <div className={style.mailName} onClick={ () => onClickEventHandler(mail, mailList.sendMemberName[index].memberName) }>
                                    {mailList.sendMemberName && mailList.sendMemberName[index].memberName}</div>
                                <div className={style.mailTitle}>{mail.mailTitle}</div>
                                <div className={style.mailDate}>{mail.mailDate}</div>
                                </div>
                            )
                        )}
                        

                        
                    </div>
                </div>

                <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                            { Array.isArray( mailList.matchingEmails) &&
                            <button 
                                onClick={() => setCurrentPage(currentPage - 1)} 
                                disabled={currentPage === 1}
                                className={ style.pagingBtn }
                            >
                                &lt;
                            </button>
                            }
                            {pageNumber.map((num) => (
                            <li key={num} onClick={() => setCurrentPage(num)}>
                                <button
                                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                                    className={ style.pagingBtn }
                                >
                                    {num}
                                </button>
                            </li>
                            ))}
                            { Array.isArray( mailList.matchingEmails) &&
                            <button 
                                className={ style.pagingBtn }
                                onClick={() => setCurrentPage(currentPage + 1)} 
                                disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
                            >
                                &gt;
                            </button>
                            }
                        </div>
        </>    
    )
}

export default Mail;