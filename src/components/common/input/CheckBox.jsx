import styles from './checkbox.module.css';

const CheckBox  = (props) => {

    const className = [styles.chk, props.isChangeColor? styles.chkBg : ''].join(' ');
    
    return (
        <input 
            type='checkBox'
            className={className}
            id={props?.id}
            name={props?.name}
            value={props?.value}
            onToggle={props?.onToggle}
            onClick={props?.onClick}
            onChange={props?.onChange}
            style={props?.style}
            defaultChecked={props?.defaultChecked}
            checked={props?.checked}
        />
    )
}

export default CheckBox;