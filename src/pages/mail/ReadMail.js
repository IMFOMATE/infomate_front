import style from './ReadMail.module.css'

function ReadMail() {

    return (
        <>
            <div className={ style.container}>
                <div className={style.returnMail}>

                    <button> ↩ 받은메일함 </button>

                </div>

                <div className={style.button}>

                    <button>답장</button>
                    <button>삭제</button>

                </div>

                <div className={ style.content}>

                    <div className={style.title}>제목쓰여질곳</div>
                    <div className={style.sender}>보낸사람 : <span>이기원</span> </div>
                    <div className={style.receiver}>받는사람 : <span>이혜원</span></div>

                </div>

                <div className={ style.contentText}>

                    <div className={ style.text}><p>어쭈구 저쭈구</p></div>

                </div>


            </div>

        </>
        
        )


}


export default ReadMail;