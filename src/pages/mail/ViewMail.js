import style from './ViewMail.module.css'
import { useNavigate, useLocation } from 'react-router-dom';

function ViewMail() {

    const navigate = useNavigate();

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

    return (
        <>
            <div className={ style.container}>
                <div className={style.returnMail}>

                    <button onClick={ onClickHandler }> ↩ 받은메일함 </button>

                </div>

                <div className={style.button}>

                    <button onClick={ onClickReplyHandler }>답장</button>
                    <button>삭제</button>

                </div>

                <div className={ style.content}>

                    <div className={style.title}>{mail.mailTitle}</div>
                    <div className={style.sender}>보낸사람 : <span>{sendName}</span> </div>
                    <div className={style.receiver}>받는사람 : <span>{memberName}</span></div>

                </div>

                <div className={ style.contentText}>

                    <div className={ style.text}>
                        <div>
                            {
                                mail.mailContent
                            }
                        </div>
                    </div>

                </div>


            </div>

        </>
        
        )


}


export default ViewMail;