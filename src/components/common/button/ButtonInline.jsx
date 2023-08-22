import styles from './button.module.css'

const ButtonInline = ({style, value, onClick, isCancel}) => {

    const className = [styles.btn, styles.colorMiddle,isCancel? styles.cancelInline : ''].join(' ');

    return (
        <button className={className} onClick={onClick} style={style}>{value}</button>
    )
}
export default ButtonInline;
