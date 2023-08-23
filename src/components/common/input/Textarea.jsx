import styles from './input.module.css';

const TextareaEl = (props) => {

    return (
        <textarea
            className={styles.textarea}
            name={props?.name}
            value={props?.value}
            placeholder={props?.placeholder}
            onChange={props?.onChange}
            onKeyPress={props?.onKeyPress}
            onClick={props?.onClick}
            style={props?.style}
            rows={props?.rows || 2}
            maxLength={props?.maxLength}
            disabled={props?.disabled}
        />
    );
}

export default TextareaEl;