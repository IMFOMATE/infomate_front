import React, { useEffect, useState } from "react";
import myInfo from "./MyInfo.module.css"

function MyInfo() {
    const [imageUrl, setImageUrl] = useState('');

    const memberDataString = localStorage.getItem("authToken");
    const memberData = JSON.parse(memberDataString);

    useEffect(() => {
        if (memberData.profile === "http://localhost:8989/imgs/null") {
            setImageUrl(memberData.defaultProfile);
        } else if(memberData.profile) {
            setImageUrl(memberData.profile);
        }
    }, [memberData]);

    return (
        <div className={myInfo.wrapper}>
        <div className={myInfo.header}>
            <h3>내 정보</h3>
        </div>

        <div>
            <div className={myInfo.profile}>
                <div>
                    <img alt='profileImg' src={imageUrl}/>

                </div>
                <div className={myInfo.reWrapper}>
                    <div className={myInfo.profileReq}>
                        <p>이름 : {memberData.memberName}</p>
                        <p>부서 : {memberData.deptName}</p>
                        <p>직위 : {memberData.rank}</p>
                        <p>이메일 : {memberData.memberEmail}</p>
                        <p>Cell. : {memberData.memberPhone}</p>
                        <p>Dir. : {memberData.extensionNumber}</p>
                        <p>생년월일 : {memberData.memberNo}</p>
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