import React from 'react';
import style from "./DocumentSide.module.css";
import {PROTOCOL, SERVER_IP, SERVER_PORT} from "../../../../apis/APIConfig";

function DocumentSideList({key, data}) {

    const ImageError = (e)=>{
        e.target.src = '/img/user.jpg';
    };

    return (
        <li key={key} className={style.item}>
            <div className={style.photo}>
                {/*<img src={data.profile || data.data.profile} alt=""/>*/}
                <img src={`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/imgs/${data.profile}`} alt="" onError={ImageError}/>
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
