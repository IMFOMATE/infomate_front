import React from "react"
import BoardCSS from "./Board.module.css";

function Anony() {

    return (

<body>
    <div className={ BoardCSS.header }>익명게시판</div> 
    <div className={ BoardCSS.bd_contain }>
    <div className={ `${BoardCSS.table} ${BoardCSS.td} ${BoardCSS.th}`}>
        <table>
          <tr>
            <th></th>
            <th></th>
            <th>제목</th>
            <th></th>
            <th></th>
            <th></th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>제목</td>
            <td></td>
            <td></td>
            <td></td>
            <td>작성일</td>
            <td>조회수</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>제목</td>
            <td></td>
            <td></td>
            <td></td>
            <td>작성일</td>
            <td>조회수</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>제목</td>
            <td></td>
            <td></td>
            <td></td>
            <td>작성일</td>
            <td>조회수</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>제목</td>
            <td></td>
            <td></td>
            <td></td>
            <td>작성일</td>
            <td>조회수</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>제목</td>
            <td></td>
            <td></td>
            <td></td>
            <td>작성일</td>
            <td>조회수</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>제목</td>
            <td></td>
            <td></td>
            <td></td>
            <td>작성일</td>
            <td>조회수</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>제목</td>
            <td></td>
            <td></td>
            <td></td>
            <td>작성일</td>
            <td>조회수</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>제목</td>
            <td></td>
            <td></td>
            <td></td>
            <td>작성일</td>
            <td>조회수</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>제목</td>
            <td></td>
            <td></td>
            <td></td>
            <td>작성일</td>
            <td>조회수</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>제목</td>
            <td></td>
            <td></td>
            <td></td>
            <td>작성일</td>
            <td>조회수</td>
          </tr>
        </table>    
    </div>
    
    <div className={ BoardCSS.pagination }>
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

export default Anony;