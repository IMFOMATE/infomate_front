import * as React from 'react';
import GroupCss from './Group.module.css';
// import {Link} from "react-router-dom";
import InfoCss from "./Info.module.css";


function UpdateMember(){

    return(
        <>
            <main className={`main ${GroupCss.main}`}>
                <h1>인사정보등록</h1>
                <div className={`infoWrap ${InfoCss.infoWrap}`}>
                    <div className={`empInfo ${InfoCss.empInfo}`}>
                        <img className={`empImage ${InfoCss.empImage}`} alt='empImage' src='img/user.jpg'/>                               
                        <input type='file' className={`imgFile ${InfoCss.imgFile}`}/>
                        <p>* 사진은 자동으로 150x150 사이즈로 적용됩니다.</p>
                    </div>
                    <div className={`empSign ${InfoCss.empSign}`}>
                        <div className={`infoList ${InfoCss.infoList}`}>
                            <span>이름</span>
                            <input type='text' className={`eminput ${InfoCss.eminput}`} 
                            placeholder='이름을 입력하세요'/>
                        </div>
                        <div className={`infoList ${InfoCss.infoList}`}>
                            <span>사번</span>
                            <input type='text' className={`eminput ${InfoCss.eminput}`} 
                            placeholder='사번을 입력하세요'/>
                        </div>
                        <div className={`infoList ${InfoCss.infoList}`}>
                            <span>부서</span>
                            <input type='text' className={`eminput ${InfoCss.eminput}`} 
                            placeholder='부서를 입력하세요'/>
                        </div>
                        <div className={`infoList ${InfoCss.infoList}`}>
                            <span>직위</span>
                            <input type='text' className={`eminput ${InfoCss.eminput}`} 
                            placeholder='직위를 입력하세요'/>
                        </div>
                        <div className={`infoList ${InfoCss.infoList}`}>
                            <span>이메일</span>
                            <input type='text' className={`eminput ${InfoCss.eminput}`} 
                            placeholder='이메일을 입력하세요'/>
                        </div>
                        <div className={`infoList ${InfoCss.infoList}`}>
                            <span>Cell.</span>
                            <input type='text' className={`eminput ${InfoCss.eminput}`} 
                            placeholder='핸드폰번호를 입력하세요'/>
                        </div>
                        <div className={`infoList ${InfoCss.infoList}`}>
                            <span>Dir.</span>
                            <input type='text' className={`eminput ${InfoCss.eminput}`} 
                            placeholder='사내전화번호를 입력하세요'/>
                        </div>
                        <div className={`infoList ${InfoCss.infoList}`}>
                            <span>생년월일</span>
                            <input type='text' className={`eminput ${InfoCss.eminput}`} 
                            placeholder='생년월일을 입력하세요'/>
                        </div>
                        <div className={`infoList ${InfoCss.infoList}`}>
                            <span>주소</span>  
                            <input type='url' className={`eminput ${InfoCss.eminput}`} 
                            placeholder='주소를 입력하세요'/>
                        </div>
                        <div className={`infoList ${InfoCss.infoList}`}>
                            <span>입사일</span>
                            <input type='date' className={`eminput ${InfoCss.eminput}`} 
                            placeholder='입사일을 입력하세요'/>
                        </div>

                    </div>
                    <div className={`infoBnt ${InfoCss.infoBnt}`}>
                        <button>저장</button>
                        <button>취소</button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default UpdateMember;