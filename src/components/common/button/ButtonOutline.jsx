import './button.css'

const ButtonOutline = ({style, value, onClick, isCancel}) => {

    const className = `c-button-color-hard1 c-transition03 "  + ${isCancel? 'c-button-cancel' : ''}`

    return (
        <button className={className} onClick={onClick} style={style}>{value}</button>
    )
}

export default ButtonOutline;