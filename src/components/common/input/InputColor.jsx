import styles from './input.module.css'

const ColorInput = (props) => {

    return <input 
                type="color"
                name={props?.name}
                className={styles.color}
                value={props?.value}
                defaultValue={props?.defaultValue}
                style={props?.style}
                disabled={props?.isDisabled}
                onChange={props.onChange}
                />
}

export default ColorInput;