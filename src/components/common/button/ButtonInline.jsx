import './button.css'

const ButtonInline = ({style, value, onClick, isCancel}) => {

    const className = `c-button-color-middle c-transition03 ' + ${isCancel? 'c-button-cancel' : ''}`

    return (
        <button className={className} onClick={onClick} style={style}>{value}</button>
    )
}
export default ButtonInline;
