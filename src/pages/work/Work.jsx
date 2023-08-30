import React from "react";
import WorkCSS from "./Work.module.css";

function Work(){
   
    return( 
    <body> 
        <div className={ WorkCSS.header }>근무 현황</div>
        <div className={ WorkCSS.wk_contain }>
                <div className={ WorkCSS.wk_state_side }>
                    <div className={ WorkCSS.wk_state }>근태현황</div>
                    <div className={ WorkCSS.wk_state }>근무시간</div>
                </div>

            <div className={ WorkCSS.wk_state_side }>
                <div className={ WorkCSS.wk_side }>
                    <div className={ WorkCSS.smlrect }>
                        <div className={ WorkCSS.wk_state_side }>
                            <div className={ `${WorkCSS.minift} ${WorkCSS.wkfall}` }>근무시간 미달</div>
                            <div className={ `${WorkCSS.minift} ${WorkCSS.wk0}` }>지각</div>
                        </div>
                        <div className={ WorkCSS.wk_side_mini }>
                            <div className={ WorkCSS.minirect }>0 회</div>
                            <div className={ WorkCSS.minirect }>0 회</div>
                        </div>
                    </div>
                </div>
                <div className={ WorkCSS.bigrect }>
                    <div className={ WorkCSS.wk_state_side }>
                        <div className={ `${WorkCSS.minift} ${WorkCSS.wkfall}` }>오늘 근무시간</div>
                        <div className={ `${WorkCSS.minift} ${WorkCSS.wk0}` }>이번 주 근무시간</div>
                        <div className={ `${WorkCSS.minift} ${WorkCSS.wk0}` }>이번 달 근무시간</div>
                    </div>
                            <div className={ WorkCSS.wk_side_mini }>
                                <div className={ WorkCSS.minirect }>7시간 30분</div>
                                <div className={ WorkCSS.minirect }>29시간</div>
                                <div className={ WorkCSS.minirect }>75시간 20분</div>
                            </div>
                </div>
            </div>

            <div className={ WorkCSS.wkcalmon }> {"< 2023년 8월 >"} </div>

            <div className={ `${WorkCSS['table']}`}>   
        <table>
            <tr>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
            </tr>
            <tr>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
            </tr>
            <tr>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
            </tr>
            <tr>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
            </tr>
            <tr>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
              <td><br /><br /><br />출근<br />퇴근<br />총근무시간<br />외근<br /><br /></td>
              <th><br />7<br /><br />99 : 99<br />99 : 99<br />99 : 99<br /><br /><br /></th>
            </tr>
        </table>
    </div>
    </div>
        
    </body>
);
}
export default Work;