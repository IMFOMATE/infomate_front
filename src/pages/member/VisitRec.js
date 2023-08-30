import "./visitRec.css"
import trashbinImg from "../img/trashbin.png";

function VisitRec() {

    return (

        <div class="wrapper">

        <div class="header">
            <h3>보안설정</h3>
        </div>

        
        <div class="securityWrapper">

            <div class="recordContainer">


                <div class="recordWrapper">
                    <div class="device">
                        <h3>기기명</h3>
                    </div>
                    <div class="lastConnetion">
                        <h3>마지막 접속시간</h3>
                    </div>                        
                    <div class="deletion">
                        <h3>삭제</h3>
                    </div>
                </div>
                
                <div class="recordWrapper">
                    <div class="deviceName">
                        <h4>sm-520k</h4>
                    </div>
                    <div class="conneted">
                        <h4>2023-01-01</h4>
                    </div>
                    <button class="delete" type="button">
                        <img src={trashbinImg} alt="삭제"/>
                    </button>
                </div>

            </div>

        </div>
    </div>
    )
}

export default VisitRec;