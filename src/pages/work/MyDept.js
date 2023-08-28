import React from 'react';
import MyDeptCSS from './MyDept.module.css'

function MyDept() {

  return (
<body>
    <div className={ MyDeptCSS.header }>내 부서 근무 현황</div>     
    <div className={ MyDeptCSS.bd_contain }>
    <div className={ MyDeptCSS.bdcalmon }>{"< 2023년 8월 15일 >"}</div>
    <div className={ `${MyDeptCSS.table} ${MyDeptCSS.td} ${MyDeptCSS.th}`}> 
        <table>
          <tr>
            <th>부서명</th>
            <th>이름</th>
            <th></th>
            <th>출근</th>
            <th>퇴근</th>
            <th>결근</th>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td>08 : 30</td>
            <td>18 : 40</td>
            <td>여부</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td>08 : 30</td>
            <td></td>
            <td>여부</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td></td>
            <td></td>
            <td>결근</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
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
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
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
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
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
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>  
    </div>

    <div className={ MyDeptCSS.pagination }>
        <a href="#">&laquo;</a>
        <a href="#" class="active">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">&raquo;</a>
    </div>

    <div className={ MyDeptCSS.dropdown }>
      <button className={ MyDeptCSS.dropstate }>근무 상태 표시 ▼</button>
      <div className={ MyDeptCSS['dropdown-content'] }>
      <a href="#">근무중</a>
      <a href="#">외근중</a>
      <a href="#">출장중</a>
      <a href="#">회의중</a>
      </div>
    </div>
  <div className={ MyDeptCSS.wk_btn_margin }></div>
</div>
</body>
);
}

export default MyDept;