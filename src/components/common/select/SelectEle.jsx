import styles from './select.module.css';

const SelectEle = (props) => {
    return (<>
        <select
            id={props?.id}
            className={styles.select}
            name={props?.name} 
            value={props?.value} 
            disabled={props?.disabled}
            style={props?.style}
            defaultValue={props?.defaultValue}
            onSelect={props?.onSelect}
            onChange={props?.onChange}
            onClick={props?.onClick}
            >
            {props?.options?.map((item, index) => 
                <option key={index} value={item.value} >
                    {item.text}
                </option>
            )}
        </select>
        </>
    )
}

export default SelectEle;