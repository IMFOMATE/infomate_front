import styles from './cusLabel.module.css'

export const SideSubLabel = ({text, style}) =>{
    return (
        <div className={styles.subTitle} style={style}>
            <label>{text}</label>
        </div>
    )
}