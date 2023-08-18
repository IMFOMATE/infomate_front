import ButtonInline from "../../button/ButtonInline";
import InputEle from "../../input/Input";
import ColorInput from '../../input/InputColor'
import './CalendarAdd.css'

const CalendarAdd = () => {

    return (
        <>
            <div className='c-Calendar-add'>
                <label style={{fontSize:20, fontWeight:500}}>캘린더 명</label>
                <InputEle type="text"  />
                <div>
                    <ColorInput style={{textAlign:'center'}}/>
                </div>
                <ButtonInline value={'추가'} style={{height: 40, width:60}} />
            </div>
        </>
    )
}

export default CalendarAdd;