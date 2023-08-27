import { forwardRef } from 'react';
import styles from './input.module.css'

const InputEle = (props,ref) => {
    
    return <input
            id={props?.id}
            ref={ref}
            className={styles.input}
            name={props?.name}
            type={props?.type} 
            defaultValue={props?.defaultValue}
            value={props?.value || ''}  
            onChange={props?.onChange} 
            placeholder={props?.placeholder} 
            disabled={props?.disabled}
            onKeyPress={props?.onKeyPress}
            style={props?.style}
            />
}

export default forwardRef(InputEle);



