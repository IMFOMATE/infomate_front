import React from 'react';
import style from "../../../../pages/approval/DocumentMain.module.css";

function WriterInfo({writer}) {
    const {name, dept, date} = writer;

    return (
        <table className={style.top_table}>
            <colgroup>
                <col width="100"/>
                <col width="150"/>
            </colgroup>
            <tbody>
            <tr className={style.tr}>
                <td className={style.td}>기안자</td>
                <td className={style.td}>{name}</td>
            </tr>
            <tr className={style.tr}>
                <td className={style.td}>소속부서</td>
                <td className={style.td}>{dept}</td>
            </tr>
            <tr className={style.tr}>
                <td className={style.td}>기안일</td>
                <td className={style.td}>{date}</td>
            </tr>
            <tr className={style.tr}>
                <td className={style.td}>문서번호</td>
                <td className={style.td}></td>
            </tr>
            </tbody>
        </table>
    );
}


export default WriterInfo;