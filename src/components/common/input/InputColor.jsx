import styles from './input.module.css'

const ColorInput = (props) => {

    return <input type="color" className={styles.color} value={props.value}  style={props.style}/>
}

export default ColorInput;