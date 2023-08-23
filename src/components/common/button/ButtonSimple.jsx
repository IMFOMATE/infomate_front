import styles from './button.module.css';

const ButtonSimple = (props) =>{
    return (
        <>
            <button
                className={styles.btnSimple}
                id={props?.id}
                name={props?.name}
                // value={props?.id}
                onClick={props.onClick}
                style={props?.style}
            >{props.text}</button>
        </>
    )
}

export default ButtonSimple;