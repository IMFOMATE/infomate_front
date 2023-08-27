import ButtonInline from "../../common/button/ButtonInline";
import InputEle from "../../common/input/Input";
import styles from './CalendarAdd.module.css'
import { ColorPicker } from "antd";

const CalendarAdd = ({calendarAddData, calendarAddHandler,registCalendarHandler}) => {

    return (
        <>
            <div className={styles.add}>
                <label style={{fontSize: '1rem', fontWeight: 500}}>캘린더 명</label>
                
                <InputEle 
                    name='name'
                    type="text"
                    value={calendarAddData?.name}
                    onChange={calendarAddHandler}
                    style={{height:16}}
                />
                
                <div style={{alignSelf: 'center'}}>
                    <ColorPicker 
                        defaultValue={'#000000'}
                        value={calendarAddData?.labelColor}
                        onChangeComplete={calendarAddHandler}
                        
                    />
                </div>
                
                <ButtonInline
                    value={'추가'} 
                    onClick={registCalendarHandler}
                    style={{height: 30, width:60}} />
            </div>
        </>
    )
}

export default CalendarAdd;