import '../../components/common/header/default.css';
import style from './MailWrite.module.css'
// import { summerNote } from 'summernote' 


function MailWrite() {

    



    return (
        <>
            <div className= 'wrapper'>
                <h1 style={{ color: 'var(--color-text-title)' }}>메일쓰기</h1>
                <button className={style.sendButton}>보내기</button>
                <div className={style.writeContent}>
                    <div className={style.receiver}>
                        <p>받는사람</p>
                        <input type={style.text} className={style.inputText}/>
                    </div>
                    <div className={style.reference}>
                        참조
                        <input type={style.text} className={style.inputText}/>
                    </div>
                    <div className={style.mailTitle}>
                        제목
                        <input type={style.text} className={style.inputText}/>
                    </div>
                    <div className={ style.attachedFile}>
                        첨부파일
                        <button className={style.uploadBox}></button>
                    </div>
                </div>
            </div>
        </>    
    )
}

export default MailWrite;
