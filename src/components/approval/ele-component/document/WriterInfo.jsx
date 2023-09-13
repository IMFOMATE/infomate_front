import React from 'react';
import style from "../../../../pages/approval/DocumentMain.module.css";
import {formatApprovalDate} from "../common/dataUtils";

function WriterInfo({writer, id, start, istemp}) {
    const {memberName, deptName} = writer;

    return (
        <table className={style.top_table}>
            <colgroup>
                <col width="100"/>
                <col width="150"/>
            </colgroup>
            <tbody>
            <tr className={style.tr}>
                <td className={style.td}>기안자</td>
                <td className={style.td}>{memberName || ''}</td>
            </tr>
            <tr className={style.tr}>
                <td className={style.td}>소속부서</td>
                <td className={style.td}>{deptName || ''}</td>
            </tr>
            <tr className={style.tr}>
                <td className={style.td}>기안일</td>
                <td className={style.td}>{formatApprovalDate(start)
                }
                </td>
            </tr>
            <tr className={style.tr}>
                <td className={style.td}>문서번호</td>
                <td className={style.td}>{istemp ? id : ''}</td>
            </tr>
            </tbody>
        </table>
    );
}

export default WriterInfo;