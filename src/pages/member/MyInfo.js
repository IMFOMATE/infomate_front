import React from "react";
import myInfo from "./MyInfo.module.css"

function MyInfo() {

    return (
        <div className={myInfo.wrapper}>
        <div className={myInfo.header}>
            <h3>내 정보</h3>
        </div>

        <div>
            <div className={myInfo.profile}>
                <div>
                    <span>사진</span>
                    
                        <input className="registPhoto" type="file" id="photo" name="photo" />

                </div>
                <div className={myInfo.reWrapper}>
                    <div className={myInfo.profileReq}>
                        <p>이름 : </p>
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
                </div>
            </div>
            {/* <div className={myInfo.btnWrapper}>
                <div className={myInfo.btn}>
                    <button>저장</button>
                    <button>취소</button>
                </div>
            </div> */}
        </div>
    </div>
    )
}

export default MyInfo;