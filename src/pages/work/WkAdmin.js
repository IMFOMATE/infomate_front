import React from 'react';
import AdminCSS from './WkAdmin.module.css'

function WkAdmin(){

    return(
<body>
    <div className={ AdminCSS.header }>직원 근태 현황</div>
    <div className={ AdminCSS.bd_contain }>
    <div className={ AdminCSS.bdcalmon }>{"< 2023년 8월 15일 >"}</div>
    <h2>부서선택 드롭다운</h2>
    <div className={ `${AdminCSS.table} ${AdminCSS.td} ${AdminCSS.th}`}>
        <table>
          <tr>
            <th>부서원</th>
            <th>부서명</th>
            <th></th>
            <th>출근</th>
            <th>퇴근</th>
            <th>결근</th>
          </tr>
          <tr>
            <td>부서원</td>
            <td>부서명</td>
            <td></td>
            <td>출근</td>
            <td>퇴근</td>
            <td>결근</td>
          </tr>
          <tr>
            <td>부서원</td>
            <td>부서명</td>
            <td></td>
            <td>출근</td>
            <td>퇴근</td>
            <td>결근</td>
          </tr>
          <tr>
            <td>부서원</td>
            <td>부서명</td>
            <td></td>
            <td>출근</td>
            <td>퇴근</td>
            <td>결근</td>
          </tr>
          <tr>
            <td>부서원</td>
            <td>부서명</td>
            <td></td>
            <td>출근</td>
            <td>퇴근</td>
            <td>결근</td>
          </tr>
          <tr>
            <td>부서원</td>
            <td>부서명</td>
            <td></td>
            <td>출근</td>
            <td>퇴근</td>
            <td>결근</td>
          </tr>
          <tr>
            <td>부서원</td>
            <td>부서명</td>
            <td></td>
            <td>출근</td>
            <td>퇴근</td>
            <td>결근</td>
          </tr>
          <tr>
            <td>부서원</td>
            <td>부서명</td>
            <td></td>
            <td>출근</td>
            <td>퇴근</td>
            <td>결근</td>
          </tr>
          <tr>
            <td>부서원</td>
            <td>부서명</td>
            <td></td>
            <td>출근</td>
            <td>퇴근</td>
            <td>결근</td>
          </tr>
          <tr>
            <td>부서원</td>
            <td>부서명</td>
            <td></td>
            <td>출근</td>
            <td>퇴근</td>
            <td>결근</td>
          </tr>
          <tr>
            <td>부서원</td>
            <td>부서명</td>
            <td></td>
            <td>출근</td>
            <td>퇴근</td>
            <td>결근</td>
          </tr>
        </table>    
    </div>
    
    <div className={ AdminCSS.pagination }>
        <a href="#">&laquo;</a>
        <a href="#" class="active">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">&raquo;</a>
      </div>
    </div>    
</body>
    );
}
export default WkAdmin;