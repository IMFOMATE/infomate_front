import "./alarm.css"

function Alarm() {

    return (

        <div class="wrapper">

        <div class="header">
            <h3>알림설정</h3>
        </div>

        <div class="alarmWrapper">

            <div class="titleWapper">

                <div class="asd">
                    <div class="alarmTitle">
                        <h4>메일</h4>
                    </div>
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                </div>

                <div class="asd">
                    <div class="alarmTitle">
                        <h4>전자결재</h4>
                    </div>
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                </div>

                <div class="asd">
                    <div class="alarmTitle">
                        <h4>스케쥴</h4>
                    </div>
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                </div>

                <div class="asd">
                    <div class="alarmTitle">
                        <h4>게시판</h4>
                    </div>
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                </div>

                <div class="asd">
                    <div class="alarmTitle">
                        <h4>근태관리</h4>
                    </div>
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                </div>

            </div>

        </div>

    </div>
    )
}

export default Alarm;