import './checkbox.css'

const CheckBox  = (props) => {
    return (
        <input 
            type='checkBox'
            className={'c-checkbox'}
            id={props.id}
            name={props.name}
            value={props.value}
            onToggle={props.onToggle}
            onClick={props.onClick}
            onChange={props.onChange}
        />
    )
}

export default CheckBox;