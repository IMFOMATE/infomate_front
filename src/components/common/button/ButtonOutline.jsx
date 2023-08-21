import styles from './button.module.css'

const ButtonOutline = ({style, value, onClick, isCancel}) => {

    // const className = `c-button c-button-color-hard c-transition03 "  + ${isCancel? 'c-button-cancel-outline' : ''}`
    const className = [styles.btn, styles.colorHard,isCancel? styles.cancelOutline : ''].join(' ');

    return (
        <button className={className} onClick={onClick} style={style}>{value}</button>
    )
}

export default ButtonOutline;