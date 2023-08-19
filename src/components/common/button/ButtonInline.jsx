import styles from './button.module.css'

const ButtonInline = ({style, value, onClick, isCancel}) => {

    // const className = `btn c-button-color-middle c-transition03 ' + ${isCancel? 'c-button-cancel-inline' : ''}`
    const className = [styles.btn, styles.colorMiddle,isCancel? styles.cancelInline : ''].join(' ');

    return (
        <button className={className} onClick={onClick} style={style}>{value}</button>
    )
}
export default ButtonInline;
