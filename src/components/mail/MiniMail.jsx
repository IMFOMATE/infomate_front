import React from 'react';
import style from '../../pages/mail/Mail.module.css';
import {useEffect, useState, useRef} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {
  callMiniMailSelectAPI
} from '../../apis/MailAPICalls'
import dayjs from "dayjs";


function MiniMail({title}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mail = useSelector(state => state.mailReducer);
  const mailList = mail.data?.data || {matchingEmails: []};
  const params = useParams();
  const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const date = dayjs(mail.mailDate )

  const yStatusEmails = mailList.matchingEmails.filter((mail) => mail.mailStatus === 'N');


  const yStatusEmailsCount = yStatusEmails.length;


  const pageInfo = mail.data?.pageInfo || {pageEnd: 1};

  const pageNumber = [];

  if (pageInfo) {
    for (let i = 1; i <= pageInfo.pageEnd; i++) {
      pageNumber.push(i);
    }
  }

  // console.log("loginMember" , loginMember);


  console.log("mailList", mailList);

  const authTokenJSON = localStorage.getItem('authToken');

  // JSON 형식의 데이터를 JavaScript 객체로 파싱
  const authToken = JSON.parse(authTokenJSON);

  // 회원 코드를 가져옴
  const memberCode = authToken.memberCode;


  useEffect(
      () => {
        setStart((currentPage - 1) * 5);
        dispatch(callMiniMailSelectAPI({
          memberCode: memberCode,
          currentPage: currentPage,
          title: title
        }));
      }, [currentPage, title]);


  return (
      <>
        <div>
          <h3 className={style.mini_mail_title} >
            {title}
            <p>전체 메일 {mailList.matchingEmails.length} / 안읽은 메일 {yStatusEmailsCount}</p>
          </h3>

          <div className={style.mailLine}></div>

          <div className={style.mailContent}>

            <div className={style.mailSubtitle}>
              <div className={style.mailName}>이름</div>
              <div className={style.mailTitle}>제목</div>
              <div className={style.mailDate}>날짜</div>
            </div>

            {mailList.matchingEmails && mailList.matchingEmails.slice(0,5).map(
                (mail, index) => (

                    <div key={mail.mailCode}
                         style={{background: (mail.mailStatus === 'Y') ? "rgba(155,155,155,0.1)" : ""}}>
                      <div className={style.mailName}>
                        {mailList.sendMemberName && mailList.sendMemberName[index].memberName}</div>
                      <div className={style.mailTitle}>{mail.mailTitle}</div>
                      <div className={style.mailDate}>{date.format("YY-MM-DD")}</div>
                    </div>
                )
            )}

          </div>
        </div>
      </>
  )
}

export default MiniMail;