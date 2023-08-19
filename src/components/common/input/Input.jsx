import styles from './input.module.css'

const InputEle = (props) => {


    return <input
            id={props?.id}
            className={styles.input}
            name={props?.name}
            type={props?.type} 
            value={props?.value}  
            onChange={props?.onChange} 
            placeholder={props?.placeholder} 
            disabled={props?.isDisabled}
            onKeyPress={props?.onKeyPress}
            style={props.style}
            />
}

export default InputEle;



