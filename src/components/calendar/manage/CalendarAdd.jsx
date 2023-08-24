import ButtonInline from "../../common/button/ButtonInline";
import InputEle from "../../common/input/Input";
import ColorInput from '../../common/input/InputColor'


import styles from './CalendarAdd.module.css'

const CalendarAdd = () => {

    const className  = [styles.add].join(' ');

    return (
        <>
            <div className={className}>
                <label style={{fontSize: '1rem', fontWeight: 500}}>캘린더 명</label>
                
                <InputEle type="text" style={{height:16}} />
                
                <div style={{alignSelf: 'center'}}>
                    <ColorInput style={{textAlign:'center', width:35, height:35}}/>
                </div>
                
                <ButtonInline value={'추가'} style={{height: 30, width:60}} />
            </div>
        </>
    )
}

export default CalendarAdd;