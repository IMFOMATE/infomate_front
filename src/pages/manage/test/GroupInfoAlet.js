import * as React from 'react';
import GroupCss from './Group.module.css';
import {Link} from "react-router-dom";
// import { useState } from 'react';

function GroupInfoAlet () {

    // const []

    return(

        <>
            
                <div className={`firstWrap ${GroupCss.firstWrap}`}>
                    <div className={`deptInfo ${GroupCss.deptInfo}`}>
                        <div className={`infoBox ${GroupCss.infoBox}`}>
                            <div className={`infoIcon ${GroupCss.infoIcon}`}>
                                <Link to='/'>
                                    <span className='material-symbols-outlined'>
                                        close
                                    </span>
                                </Link>
                            </div>
                            <div className={`empInfo ${GroupCss.empInfo}`}>
                                <img className={`empImage ${GroupCss.empImage}`} alt='empImage' src='img/user.jpg'/>                               
                            </div>
                            <div className={`empSign ${GroupCss.empSign}`}>
                                <p>이름 : 홍길동</p>
                                <p>직급 : 과장</p>
                                <p>부서 : 인사관리 부서 3팀</p>
                                <p>이메일 : hong123@gamil.com</p>
                                <p>내선번호 : 02-2266-1234</p>
                            </div>
                        </div>
                    </div>
                </div>
        
        </>
    )
}


export default GroupInfoAlet; 
