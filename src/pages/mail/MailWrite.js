import style from './MailWrite.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function MailWrite() {

    const quillstyle = {
      width: "90%",

      
    }



    return (
        <>
          
            <div className= {style.wrapper}>
              <div className={style.container}>
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

                <ReactQuill theme="snow" />

              </div>
            </div>

            
        </>    
    )
}

export default MailWrite;