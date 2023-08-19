import styles from './input.module.css'

const RadioInput = (props) => {
    return <input
                type='radio'
                className={styles.input}
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
