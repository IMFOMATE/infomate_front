import './attendUser.css'

const AttendUser = (props) => {
    const className  = 'c-attenduesr-button';

    return <button
            className={className}
            type={props.type}
            onClick={props.onClick}
            style={props.style}>
            {props.value}
            </button>
}

export default AttendUser;