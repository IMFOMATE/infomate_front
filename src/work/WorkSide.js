import WorkSideCSS from './WorkSide.css';

function WorkSide() {
    return (
<body>
<div class = "bg_contain">    
    <div class = "manage_ft">
    <h3>근태관리</h3>

    <div class="timer">12 : 30</div>

    <div class="timer_ft">출근시간 09 : 30</div>
    <div class="timer_ft">퇴근시간 18 : 30</div>

    <br/>
    

    <div class="dropdown">
        <button class="dropstate">근무 상태 표시 ▼</button>
        <div class="dropdown-content">
        <a href="#">근무중</a>
        <a href="#">외근중</a>
        <a href="#">출장중</a>
        <a href="#">회의중</a>
        </div>
      </div>
    <div class="wk_btn_margin"></div>

    <div class="wk_btn_container">
    <button class="wk_wkoffbtn">출근하기</button>
    <button class="wk_wkoffbtn">퇴근하기</button>
    </div>
    <br/>


    <div class="wk_bigctgr">나의 근태 현황</div>
    <div class="wk_smlctgr">- 근무 현황</div>
    <div class="wk_smlctgr">- 내 연차 정보</div>
    <br/>
    

    <div class="wk_bigctgr">부서 근태 현황</div>
    <div class="wk_smlctgr">- 부서 근무 현황</div>
    <div class="wk_smlctgr">- 사내 근무 현황</div>

    </div>

</div>
</body>

);
}

export default WorkSide;