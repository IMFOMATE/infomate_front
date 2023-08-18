import ButtonOutline from '../../components/common/button/ButtonOutline';
import CheckBox from '../../components/common/input/CheckBox';
import InputEle from '../../components/common/input/Input';
import './calendar.css';

const SecheduleCreate = () => {
  
    return (
        <>
            <div className="c-create-schedule c-transition03">
                <div className="c-create-schedule-title">
                    <span style={{fontSize: 30}}>
                     일정 등록
                    </span>
                    <span className="c-create-schedule-close">
                        X
                    </span>
               </div>
                <div className="c-create-schedule-content c-transition03">
                    <div className="c-create-schedule-col c-transition03">                    
                        <label>일정명</label>
                        <InputEle type={'text'} value={''} />
                
                        
                    
                        <label style={{alignSelf:'center'}}>일시</label>    
                        <div className="c-create-schedule-date">
                            <div>
                                <InputEle type={'datetime-local'} />
                            </div>
                            <div style={{textAlign: 'left'}}>
                                <InputEle type={'datetime-local'} />
                                <CheckBox id="all-day" type="checkbox" name="" style={{display:'inline'}}/>
                                <label for="all-day">종일</label>
                            </div>
                        </div>

                        <label>캘린더</label>
                        <select>
                            <option>내용 목록</option>
                        </select>

                        <label for="address">장소</label>
                        <InputEle type={'text'}/>
                        
                        <label for="corp-schedule">전사일정</label>
                        <div style={{textAlign: 'left'}}>
                            <CheckBox id="corp-schedule" type="checkbox" />
                        </div>
                    </div>
                    <div className="c-create-schedule-bottom">
                        <ButtonOutline value={'상세일정등록'} />
                        <ButtonOutline value={'등록'} />
                        <ButtonOutline value={'닫기'} isCancel={true}/>
                    </div>
                </div>
            </div>
        </>
    )
}
    

export default SecheduleCreate;