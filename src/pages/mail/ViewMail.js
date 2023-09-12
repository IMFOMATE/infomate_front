import style from './ViewMail.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    callDeleteMailAPI , callFileAPI
} from '../../apis/MailAPICalls'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState, useRef } from "react";
import { LoadingSpiner } from '../../components/common/other/LoadingSpiner';
import { GET_FILE } from '../../modules/MailModule';


function ViewMail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const file = useSelector(state => state.mailReducer[GET_FILE]);

    const quillstyle = {
        width: "91%",
        height: "400px",
        marginTop: "30px",
    }


    console.log('filesssss',file);
    const authTokenJSON = localStorage.getItem('authToken');

    
     const authToken = JSON.parse(authTokenJSON);
 
    
     const memberName = authToken.memberName;

    const location = useLocation();
    const { mail, sendName } = location.state;

    console.log("mail", mail);
    console.log("sendName", sendName);

    const onClickHandler = () => {

        navigate('/mail' )
    }

    const onClickReplyHandler = () => {
        
        navigate('/mail/mailWrite', { state: { sendName : sendName } })
    }

    const onClickDeleteHandler = () => {
        console.log("안녕", mail.mailCode);
      
            dispatch(callDeleteMailAPI({
                mailCode : mail.mailCode
            }));
        navigate('/mail/allMail')

    }

    useEffect(
        () => {
            
            dispatch(callFileAPI({
                mailCode: mail?.mailCode,
            }));
        },[]);

        

    const modules = {
        toolbar: false, // 툴바 모듈 비활성화 (버튼 없음)
      };
    

    if(!file) return <LoadingSpiner/>

    return (
        <>
            <div className={ style.container}>
                <div className={style.returnMail}>

                    <button onClick={ onClickHandler }> ↩ 받은메일함 </button>

                </div>

                <div className={style.button}>

                    <button onClick={ onClickReplyHandler }>답장</button>
                    <button onClick={ onClickDeleteHandler }>삭제</button>

                </div>

                <div className={ style.content}>

                    <div className={style.title}>{mail.mailTitle}</div>
                    <div className={style.sender}>보낸사람 : <span>{sendName}</span> </div>
                    <div className={style.receiver}>받는사람 : <span>{memberName}</span></div>

                </div>
                

                <div className={ style.contentText}>

                    
                <div className={style.file}>
                    <div>첨부파일</div>
                    <div className={style.fileBox}>
                        {
                        file?.data == null ?
                        
                        <LoadingSpiner/>
                        :
                        file?.data?.map( file => <>
                        
                            <a href={file.fileModificationName} target='_blank' rel='noreferrer'>{file.fileModificationName}  </a>
                            <br/>
                        </>
                        )
                        
                        }
                    </div>
                </div>

                <div className={style.quill}>
                        <ReactQuill  style={ quillstyle } 

                            value={ mail.mailContent}
                            readOnly={true}
                            modules={modules}
                    
                            />
                    </div>
                    {/* <div className={ style.text}>
                        <div>
                            {
                                mail.mailContent
                            }
                        </div>
                    </div> */}

                </div>


            </div>

        </>
        
        )


}


export default ViewMail;