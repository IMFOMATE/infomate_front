import Styles from './calendarNavItem.module.css'

const CalendarNavItem = () => {

   return (
        <div class="c-sidebar-calendar-item">
            <div>
                <input id="1" type="checkbox"/> 
                <label for="1">내 일정</label>
            </div>
            <div class="c-sidebar-calendar-color">
                <button style="height: 15px; width: 15px; background-color: red; border-radius: 30px; border: 0;"/>
            </div>
        </div>
   ) 
}

export default CalendarNavItem;

