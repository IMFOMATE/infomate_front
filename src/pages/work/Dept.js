import React from "react";
import DeptCSS from "./Dept.module.css"

function Dept() {

  return (
<body>
    <div className={ DeptCSS.header }>사내 근무 현황</div>
    <div className={ DeptCSS.bd_contain }>
    <div className={ DeptCSS.bdcalmon }>{"< 2023년 8월 15일 >"}</div>
    <div className={ `${DeptCSS.table} ${DeptCSS.td} ${DeptCSS.th}`}>
        <table>
          <tr>
            <th>부서명</th>
            <th>이름</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>상태</th>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>근무중</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>회의중</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>외근</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>근무중</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>    
    </div>
    
    <div className={ DeptCSS.pagination }>
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

export default Dept;