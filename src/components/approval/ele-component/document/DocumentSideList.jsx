import React from 'react';
import style from "./DocumentSide.module.css";

function DocumentSideList({key, data}) {


    return (
        <li key={key} className={style.item}>
            <div className={style.photo}>
                {/*<img src={data.profile || data.data.profile} alt=""/>*/}
                <img src='/img/user.jpg' alt=""/>
            </div>
            <div className={style.content}>
                <span>{`${data.text || data.memberName} ${data.rankName || data.data.rank }`}
                </span>
                <span>{data.approvalDate !== null ? data.approvalDate : '결재대기'}</span>
                {
                    (data.comment === null) ? ''
                        :
                      <span className={style.comment}>{data.comment}</span>
                }

                {/*<p>기안의견이지롱롱롱롱ㄹㅇ</p>*/}
            </div>
        </li>
    );
}

export default DocumentSideList;
