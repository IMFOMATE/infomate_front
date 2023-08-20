import { Link } from 'react-router-dom';
import React from 'react';
import '../../components/common/header/default.css';
import style from './Mail.module.css';
 


function Mail() {


    return (
        <>
                   <div className={ style.wrapper }>
                    <h1 style={{color: 'var(--color-text-title)', display: 'flex' }}>
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
                        
                            <input type="checkbox" className={style.mailCheckbox}/>
                            <div className={style.mailName}>이기원</div>
                            <div className={style.mailTitle}>메일제목 ㅁㄴㅇㅁㄴㄹ</div>
                            <div className={style.mailDate}>날짜</div>
                        
                    </div>
                </div>
        </>    
    )
}

export default Mail;