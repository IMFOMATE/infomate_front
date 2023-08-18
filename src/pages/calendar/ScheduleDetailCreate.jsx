import './calendar.css'
import InputEle from '../../components/common/input/Input'
import ButtonInline from '../../components/common/button/ButtonInline';
import AttendUser from '../../components/common/calendar/AttendUser';
import CheckBox from '../../components/common/input/CheckBox';
import TextareaEl from '../../components/common/input/Textarea';


const ScheduleDetilaCreate = (props) => {

    return (
        <>
            <div className='c-create-schedule-containor'>
                <div className='c-create-schedule-title'>
                    <h3>일정 등록</h3>
                </div>
                <div>
                    <div>
                        <label>일정 제목</label>
                    </div>
                    <div class="c-schedule-detail-sub-item c-schedule-detail-sub-col-2">
                        <div>
                            <InputEle type="text"/>
                        </div>
                        <div>
                            <div style={{'margin-right': 10}}>
                                <CheckBox id="private" isChangeColor={true}/>
                                <label className='c-create-schedule-chk-label' for="private">비공개</label>
                            </div>
                            <div>
                                <CheckBox id="importent" isChangeColor={true}/>
                                <label className='c-create-schedule-chk-label' for="importent">중요</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <label style={{a: 'middle'}}>일정</label>
                        </div>
                        <div class="c-schedule-detail-sub-item c-schedule-detail-sub-col-3">
                            <InputEle type="datetime-local" />
                            <InputEle type="datetime-local" />
                            <div className='c-schedule-detail-sub-col'>
                                <div style={{'margin-right': 10}}>
                                    <CheckBox id="all-day" isChangeColor={true}/>
                                    <label className='c-create-schedule-chk-label' for="all-day">종일</label>
                                </div>
                                <div>
                                    <CheckBox id="circle" isChangeColor={true}/>
                                    <label className='c-create-schedule-chk-label' for="circle">반복</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="c-schedule-detail-container">
                    <label for="corp-schedule">전사일정</label>
                    <div className='c-schedule-detail-extend-el'>
                        <CheckBox id="corp-schedule" isChangeColor={true}/> {/* 가운데 안감*/}
                    </div>

                    <label>참석자</label>
                    <div style={{margin:'10px 0 10px 0'}}>
                        <AttendUser value={'홍길동'}/>  
                        <AttendUser value={'홍길동'}/>  
                        <AttendUser value={'홍길동'}/>  
                        <AttendUser value={'홍길동'}/>  
                        <AttendUser value={'홍길동'}/>  
                        <AttendUser value={'홍길동'}/>  
                        <AttendUser value={'홍길동'}/>                          
                    </div>
                    
                    <label for="address">장소</label>
                    <div className='c-schedule-detail-container-col'>
                        <InputEle id="address" type="text"/>
                        <ButtonInline value={'주소검색'} onclick="" style={{height:30, width:80, display:'inline'}} />
                    </div>

                    <label>내용</label>
                    <div>
                        <TextareaEl rows="15" style={{width:'95%'}}/>
                    </div>
                </div>
                <div className='c-schedule-detail-footer'>
                    <div>
                        <ButtonInline value="등록" onclick="" style={{width:80, height: 40}}/>
                    </div>
                    <div>
                        <ButtonInline isCancel={true} value="닫기" onclick="" style={{width:80, height: 40}}/>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ScheduleDetilaCreate;
