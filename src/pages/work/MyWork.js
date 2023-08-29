import React from "react";
import MyWorkCSS from './MyWork.module.css';
import mainCSS from '../../components/common/main.module.css';

function MyWork() {

    // const work = useSelector(state => state.workreducer);
    // const workList = work.data;
    // console.log('MyWork', workList);

    return (
      <>
      <div className={mainCSS.maintitle}>
      나의 연차 내역
      </div>

    <div className={ MyWorkCSS.minift }>연차 사용 내역 조회 (최근 3년)
      <div className={ MyWorkCSS.dropyears }>
        <button className={ MyWorkCSS.dropyear }>2023년도 ▼</button>
        <div className={ MyWorkCSS.dropdowncontent }>
        <a href="#">2022년도</a>
        <a href="#">2021년도</a>

        </div>
      </div>
    </div>
    <div className={ MyWorkCSS.wk_btn_margin }></div>
    <br/>
    <br />

    
              <div className={ MyWorkCSS.wktable }>
                <colgroup>
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="20%" />
                    <col width="30%" />
                </colgroup>
                <thead>
                    <tr>
                        <th className={MyWorkCSS.wktable_th}>부서명</th>
                        <th className={MyWorkCSS.wktable_th}>이름</th>
                        <th className={MyWorkCSS.wktable_th}>연차/월차 정보</th>
                        <th className={MyWorkCSS.wktable_th}>연사 차용 기간</th>
                        <th className={MyWorkCSS.wktable_th}>사유</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={MyWorkCSS.wktable_td}>영업부</td>
                        <td className={MyWorkCSS.wktable_td}>김민지</td>
                        <td className={MyWorkCSS.wktable_td}>연차</td>
                        <td className={MyWorkCSS.wktable_td}>2023.08.27~2023.08.29</td>
                        <td className={MyWorkCSS.wktable_td}>개인사정</td>
                    </tr>
                  
                </tbody>                    
            </div>       
    
            </>
    );
}

export default MyWork;