import React from 'react';
import style from "./DocumentSide.module.css";

function DocumentSideList({key, data, profile, text}) {


    return (
        <li key={key} className={style.item}>
            <div className={style.photo}>
                <img src={data.data.profile} alt=""/>
            </div>
            <div className={style.content}>
                <span>{`${data.text} 
                ${data.data.rank ?? data.rankName }
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`}</span>
                {/*<span>{data.data.rank}</span>*/}
                {/*<span>완료여부</span>*/}
                {/*<p>기안의견이지롱롱롱롱ㄹㅇ</p>*/}
            </div>
        </li>
    );
}

export default DocumentSideList;
