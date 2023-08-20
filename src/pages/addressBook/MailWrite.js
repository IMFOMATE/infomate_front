function MailWrite() {

    return (
        <>
            <div className="wrapper">
                <h1 style={{ color: 'var(--color-text-title)' }}>메일쓰기</h1>
                <div className="write-content">
                    <div className="receiver">
                        받는사람
                        <input type="text"/>
                    </div>
                    <div className="reference">
                        참조
                        <input type="text"/>
                    </div>
                    <div className="mail-title">
                        제목
                        <input type="text"/>
                    </div>
                    <div className="attached-file">
                        <input type="file"/>
                    </div>
                </div>
            </div>
        </>    
    )
}

export default MailWrite;
