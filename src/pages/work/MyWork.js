import React from "react";
import MyWorkCSS from './MyWork.module.css';

function MyWork() {

    // const work = useSelector(state => state.workreducer);
    // const workList = work.data;
    // console.log('MyWork', workList);

    return (

   

<body>
    <div className={ MyWorkCSS.header }>나의 연차 내역</div>

    <h1>잔여연차 : 0개 css고민중</h1>

    <div className={ MyWorkCSS.wk_contain }>
    <div className={ MyWorkCSS.wk_side }>
    <div className={ MyWorkCSS.minift }>연차 사용 내역 조회 (최근 3년)
      <div className={ MyWorkCSS.dropyears }>
        <button className={ MyWorkCSS.dropyear }>2023년도 ▼</button>
        <div className={ MyWorkCSS.dropdowncontent }>
        <a href="#">2022년도</a>
        <a href="#">2021년도</a>

        </div>
      </div>
    </div>
    </div>
    <div className={ MyWorkCSS.wk_btn_margin }></div>
    <br/>
    <br />


    <table className={ MyWorkCSS.productTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="50%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품이름</th>
                        <th>상품가격</th>
                        <th>활성화여부</th>
                        <th>상품 카테고리</th>
                        <th>재고</th>
                    </tr>
                </thead>
                <tbody>
                    {/* { Array.isArray(workList) && workList.map((w) => (
                        <tr
                            key={ w.workCode }
                            // onClick={ () => onClickTableTr(w.workCode) }
                        >
                            <td>{ w.workCode }</td>
                            <td>{ w.member }</td>
                            <td>{ w.timeStart }</td>
                            <td>{ w.timeEnd }</td>
                            <td>{ w.workStatus }</td>
                        // </tr> */}
                    {/* )) 
                    } */}
                </tbody>                    
            </table>       


      {/* <div className={ `${MyWorkCSS.table} ${MyWorkCSS.td} ${MyWorkCSS.th}`}>
        <table>
          <tr>
            <th>부서명</th>
            <th>이름</th>
            <th>연차/월차 정보</th>
            <th>연차 사용 기간</th>
            <th>사유</th>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td>연차</td>
            <td>2023.08.16 ~ 2024.12.26</td>
            <td>긴히 쓸 일이 있어용</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td>연차/월차 정보</td>
            <td>사용 기간</td>
            <td>사유</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td>연차/월차 정보</td>
            <td>사용 기간</td>
            <td>사유</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td>연차/월차 정보</td>
            <td>사용 기간</td>
            <td>사유</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td>연차/월차 정보</td>
            <td>사용 기간</td>
            <td>사유</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td>연차/월차 정보</td>
            <td>사용 기간</td>
            <td>사유</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td>연차/월차 정보</td>
            <td>사용 기간</td>
            <td>사유</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td>연차/월차 정보</td>
            <td>사용 기간</td>
            <td>사유</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td>연차/월차 정보</td>
            <td>사용 기간</td>
            <td>사유</td>
          </tr>
          <tr>
            <td>부서명</td>
            <td>이름</td>
            <td>연차/월차 정보</td>
            <td>사용 기간</td>
            <td>사유</td>
          </tr>
        </table>
    </div>
     */}
    
</div>
</body>

    );
}

export default MyWork;