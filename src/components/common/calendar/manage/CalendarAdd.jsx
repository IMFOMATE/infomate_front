import ButtonInline from "../../button/ButtonInline";
import InputEle from "../../input/Input";
import ColorInput from '../../input/InputColor'
import './CalendarAdd.css'

const CalendarAdd = () => {

    return (
        <>
            <div className='c-Calendar-add'>
                <label style={{fontSize:'1rem', fontWeight:500}}>캘린더 명</label>
                <InputEle type="text" style={{height:16}} />
                <div>
                    <ColorInput style={{textAlign:'center'}}/>
                </div>
                <ButtonInline value={'추가'} style={{height: 30, width:60}} />
            </div>
        </>
    )
}

export default CalendarAdd;