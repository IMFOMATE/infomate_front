import "./myInfo.css"

function MyInfo() {

    return (
        <div className="wrapper">
        <div className="header">
            <h3>기본정보</h3>
        </div>

        <div>
            <div className="profile">
                <div>
                    <span>사진</span>
                    
                        <input className="registPhoto" type="file" id="photo" name="photo" />

                </div>
                <div className="reWrapper">
                    <div className="profileReq">
                        <p>이름</p>
                        <p>사번</p>
                        <p>부서</p>
                        <p>직위</p>
                        <p>이메일</p>
                        <p>Cell.</p>
                        <p>Dir.</p>
                        <p>생년월일</p>
                        <p>주소</p>
                        <p>입사일</p>
                    </div>
                    <div className="profileRes">
                        <p><input type="text" placeholder="이름을 입력하세요."/></p>
                        <p><input type="text" placeholder="사번을 입력하세요."/></p>
                        <p><input type="text" placeholder="부서를 입력하세요."/></p>
                        <p><input type="text" placeholder="직위를 입력하세요."/></p>
                        <p><input type="text" placeholder="이메일을 입력하세요."/></p>
                        <p><input type="text" placeholder="전화번호를 입력하세요."/></p>
                        <p><input type="text" placeholder="내선번호를 입력하세요."/></p>
                        <p><input type="text" placeholder="생년월일을 입력하세요."/></p>
                        <p><input type="text" placeholder="주소를 입력하세요."/></p>
                        <p><input type="text" placeholder="입사날짜를 입력하세요."/></p>
                    </div>
                </div>
            </div>
            <div className="btnWrapper">
                <div className="btn">
                    <button>저장</button>
                    <button>취소</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default MyInfo;