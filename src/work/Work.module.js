import WorkCSS from './Work.module.css';

function Work(){
    return( 
    <body> 
        <div className="header">근무 현황</div>
        <div className="wk_contain">
                <div className="wk_state_side">
                    <div className="wk_state">근태현황</div>
                    <div className="wk_state">근무시간</div>
                </div>

            <div className="wk_state_side">
                <div className="wk_side">
                    <div className="smlrect">
                        <div className="wk_state_side">
                            <div className="minift wkfall">근무시간 미달</div>
                            <div className="minift wk0">지각</div>
                        </div>
                        <div className="wk_side_mini">
                            <div className="minirect">0 회</div>
                            <div className="minirect">0 회</div>
                        </div>
                    </div>
                </div>
                <div className="bigrect">
                    <div className="wk_state_side">
                        <div className="minift wkfall">오늘 근무시간</div>
                        <div className="minift wk0">이번 주 근무시간</div>
                        <div className="minift wk0">이번 달 근무시간</div>
                    </div>
                            <div className="wk_side_mini">
                                <div className="minirect">7시간 30분</div>
                                <div className="minirect">29시간</div>
                                <div className="minirect">75시간 20분</div>
                            </div>
                </div>
            </div>

            <div className="wkcalmon"> 2023년 8월 </div>

            <table className="table td th">   {/* 테이블 시작 */}
            
                <table>         
                    <tr>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    </tr>
                    <tr>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    </tr>
                    <tr>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    </tr>
                    <tr>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    </tr>
                    <tr>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    <td><br/><br/><br/>출근<br/>퇴근<br/>총근무시간<br/>외근<br/><br/></td>
                    <th><br/>7<br/><br/>99 : 99<br/>99 : 99<br/>99 : 99<br/><br/><br/></th>
                    </tr>
                </table>
            </table>    {/* 테이블 끝 */}
        </div>
    </body>
);
}
export default Work;