import styles from './input.module.css'

const RadioInput = (props) => {
    return <input
                key={props.key}
                id={props?.id}
                type='radio'
                className={styles.input}
                name={props?.name}
                defaultChecked={props?.defaultChecked}
                // value={props?.value}
                onToggle={props?.onToggle}
                onChange={props?.onChange}
                onClick={props?.onClick}
                style={props?.style}
                checked={props?.checked}
                />
}

export default RadioInput
