import styles from './select.module.css';

const SelectEle = (props) => {
    return (
        <select
            className={styles.select}
            name={props.name} 
            value={props.value} 
            disabled={props.disabled}
            style={props.style}>
            {props.data.map(item => <option key={item.id} value={item.value}>{item.text}</option>)}
        </select>
    )
}

export default SelectEle;