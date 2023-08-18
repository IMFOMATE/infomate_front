import './input.css'

const ColorInput = (props) => {

    return <input className='c-input-color' value={props.value} type="color" style={props.style}/>
}

export default ColorInput;