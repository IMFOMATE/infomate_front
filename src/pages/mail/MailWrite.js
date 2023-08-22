import '../../components/common/header/default.css';
import style from './MailWrite.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function MailWrite() {

    const quillstyle = {
      width: "90%",
      height: "400px",
      marginTop: "30px"


    }



    return (
        <>
          
            <div className= {style.wrapper}>
                <div className={style.container}>
                    <div className={style.titleButton}>
                    <h1 style={{ color: 'var(--color-text-title)' }}>메일쓰기</h1>
                    <button className={style.sendButton}>보내기</button>
                </div>
                <div className={style.content}>
                    <div className={style.writeContent}>
                        <div className={style.receiver}>
                            받는사람
                            <input type={style.text} className={style.inputText}/>
                            <button className={style.addressButton}>연락처</button>
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
                        <ReactQuill theme="snow" style={ quillstyle }/>
                    </div>
                </div>

             

                </div>
            </div>

            
        </>    
    )
}

export default MailWrite;