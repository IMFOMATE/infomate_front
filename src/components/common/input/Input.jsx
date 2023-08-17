import './input.css'

const InputEle = (props) => {

    return <input
            id={props?.id}
            className="c-input c-transition03" 
            name={props?.name}
            type={props?.type} 
            value={props?.value}  
            onChange={props?.onChange} 
            placeholder={props?.placeholder} 
            disabled={props?.isDisabled}
            />
}

export default InputEle;



