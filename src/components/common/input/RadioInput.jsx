import './input.css'

const RadioInput = (props) => {
    return <input
                type='radio'
                className='c-input-radio'
                name={props.name}
                value={props.value}
                onToggle={props.onToggle}
                onChange={props.onChange}
                onClick={props.onClick}
                style={props.style}
                checked={props.checked}
                />
}

export default RadioInput
