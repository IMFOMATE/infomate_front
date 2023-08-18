import './button.css'

const ButtonOutline = ({style, value, onClick, isCancel}) => {

    const className = `c-button c-button-color-hard c-transition03 "  + ${isCancel? 'c-button-cancel-outline' : ''}`

    return (
        <button className={className} onClick={onClick} style={style}>{value}</button>
    )
}

export default ButtonOutline;