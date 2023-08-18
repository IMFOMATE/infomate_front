import './checkbox.css'

const CheckBox  = (props) => {

    const className = `c-checkbox ${props.isChangeColor? 'c-checkbox-background' : ''}`
    
    return (
        <input 
            type='checkBox'
            className={className}
            id={props.id}
            name={props.name}
            value={props.value}
            onToggle={props.onToggle}
            onClick={props.onClick}
            onChange={props.onChange}
            style={props.style}
        />
    )
}

export default CheckBox;