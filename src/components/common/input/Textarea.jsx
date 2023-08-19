import styles from './input.module.css';

const TextareaEl = (props) => {

    return (
        <textarea
            className={styles.textarea}
            name={props?.name? props.name : null}
            value={props?.value? props.value : null}
            placeholder={props?.placeholder? props.placeholder : null}
            onChange={props?.onChange? props.onChange : null}
            onKeyPress={props?.onKeyPress? props.onKeyPress : null}
            onClick={props?.onClick? props.onClick : null}
            style={props?.style? props.style : null}
            rows={props?.rows? props.rows : 10}
            colSpan={10}
            maxLength={props?.cols? props.cols : null}
        />
    );
}

export default TextareaEl;