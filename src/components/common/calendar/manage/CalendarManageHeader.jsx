import './header.css';

const CalendarManageHeader = (props) => {
    
    return (
        <h1 className='calendar-manage-header'
            style={props.style}
            value={props.value}>
            {props?.value ? props.value : '테스트'}
        </h1>
    )
}

export default CalendarManageHeader;