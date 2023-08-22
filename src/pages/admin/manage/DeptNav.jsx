import React from 'react';
import NavStyle from "../../components/common/Nav.module.css";

function GroupNav() {


    return (

        
        <div className={NavStyle.sidemenu}>
            <div className={NavStyle.sideTop}>
                <h1>조직도/인사관리</h1>
                <a href="/">검색하기</a>
            </div>
            <div className={NavStyle.sideList}>

                <ul>
                    {
                        category.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))
                    }
                </ul>

            </div>
        </div>
    );
}

const category = ['하나', '둘', '셋','넷'];

export default GroupNav;