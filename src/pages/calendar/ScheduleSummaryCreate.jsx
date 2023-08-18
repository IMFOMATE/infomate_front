import ButtonOutline from '../../components/common/button/ButtonOutline';
import ButtonInline from '../../components/common/button/ButtonInline';
import CheckBox from '../../components/common/input/CheckBox';
import InputEle from '../../components/common/input/Input';
import SelectEle from '../../components/common/select/SelectEle';


import './calendar.css';


const SecheduleSummaryCreate = () => {


    return (
        <>
            <div className="c-create-schedule c-transition03">
                <div className="c-create-schedule-summery-title">
                    <span style={{fontSize: 25}}>
                     일정 등록
                    </span>
                    <span className="c-create-schedule-close">
                        <ButtonInline value={'X'} />    
                    </span>
               </div>
                <div className="c-create-schedule-content c-transition03">
                    <div className="c-create-schedule-col c-transition03">
                        
                        <label>일정명</label>
                        <InputEle type={'text'} value={''} />
                    
                        <label>일시</label>    
                        <div>
                            <InputEle type={'datetime-local'} style={{margin:'0 0 1vh 0'}} />
                            <InputEle type={'datetime-local'} />
                            <div style={{height:30, alignSelf: 'center'}}>
                                <CheckBox id="all-day" type="checkbox" name="" isChangeColor={true} style={{display:'inline',position: 'relative', top:'7px'}}/>
                                <label for="all-day" style={{display:'inline',position: 'relative', top: '3px',margin: '5px'}}>종일</label>
                            </div>
                        </div>

                        <label>캘린더</label>
                        <div>
                            <SelectEle style={{width:'100%'}} data={[{text:'1',value:1},{text:'2',value:2}]} />
                        </div>

                        <label for="address">장소</label>
                        <InputEle type={'text'}/>
                        
                        <label for="corp-schedule">전사일정</label>
                        <div style={{textAlign: 'left'}}>
                            <CheckBox id="corp-schedule" type="checkbox" isChangeColor={true} style={{position: 'relative', top:'2px'}} />
                        </div>
                    </div>
                    <div className="c-create-schedule-bottom">
                        <ButtonOutline value={'상세일정등록'} style={{margin:'5px'}} />
                        <ButtonOutline value={'등록'} style={{margin:'5px'}}  />
                        <ButtonOutline value={'닫기'} isCancel={true} style={{margin:'5px'}} />
                    </div>
                </div>
            </div>
        </>
    )
}
    

export default SecheduleSummaryCreate;