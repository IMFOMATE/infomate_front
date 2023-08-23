import * as React from 'react';
import GroupCss from './Group.module.css';
import {Link} from "react-router-dom";
import InfoCss from "./Info.module.css";


function MemberInfo(){

    return(
        <>
            <main className={`main ${GroupCss.main}`}>
                <h1>조직도</h1>
                <div className={`infoWrap ${InfoCss.infoWrap}`}>
                        <div className={`infoIcon ${InfoCss.infoIcon}`}>
                        <Link to='/'>
                            <span className='material-symbols-outlined'>
                                        close
                            </span>
                        </Link>
                        </div>
                    <div className={`empInfo ${InfoCss.empInfo}`}>
                        <img className={`empImage ${InfoCss.empImage}`} alt='empImage' src='img/user.jpg'/>                               
                    </div>
                    <div className={`empSign ${InfoCss.empSign}`}>
                        <p>이름  김팀장</p>
                        <p>사번  a123456</p>
                        <p>부서  회계관리 3팀</p>
                        <p>직위  팀장</p>
                        <p>이메일  kimteam12@gmail.com</p>
                        <p>Cell.  010-1234-5678</p>
                        <p>Dir.  070-1234-5677</p>
                        <p>생년월일  1991-01-21</p>
                    </div>
                </div>
            </main>
        </>
    )


}



export default MemberInfo;