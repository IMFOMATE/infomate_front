import style from './MailWrite.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";


function MailWrite() {

    const [form, setForm] = useState({

        mailContent: "",
        mailDate: "",
        memberCode: "",
        mailStatus: "",
        mailTitle: "",
        mailLike: "",
        receiverMail: ""
    })

    const quillstyle = {
        width: "91%",
        height: "400px",
        marginTop: "30px",
    }

    const onChangeHandler = (e) => {
        setForm( {
            ...form,
            [e.target.name]: e.target.value
        })
    }




    return (
        <>

                    <div className={style.container}>
                        <div className={style.titleButton}>
                        <h1 style={{ color: 'var(--color-text-title)' }}>메일쓰기</h1>
                        <button className={style.sendButton}>보내기</button>
                    </div>
                    <div className={style.content}>

                            <div className={style.receiver}>
                                받는사람
                            </div>
                                
                                <input type={style.text} className={style.inputText} onChange={onChangeHandler}/>

                            <div className={style.reference}>
                                참조
                            </div>
                                <input type={style.text} className={style.inputText} onChange={onChangeHandler}/>
                            <div className={style.mailTitle}>
                                제목
                            </div>
                                <input type={style.text} className={style.inputText} onChange={onChangeHandler}/>
                            <div className={ style.attachedFile}>
                                첨부파일
                            </div>
                                <button className={style.uploadBox}></button>
                    </div>
                    <div className={style.quill}>
                        <ReactQuill theme="snow" style={ quillstyle }/>
                    </div>
                    
                    </div>


            
        </>    
    )
}

export default MailWrite;