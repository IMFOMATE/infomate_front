import styles from './day.module.css'

export const Day = ({today, value, data, isHeader, isCurMonth, isSun, isSur}) => {
    return (
        <>
            <td className={[styles.dayContainer, !isCurMonth && styles.notCurMonth].join(' ')}>
            <span className={[styles.count, today && styles.countToday].join(' ')}>{data?.length > 0 && data[0]?.count}</span>
            <button className={[today && styles.today, isSun && styles.sun, isSur && styles.sur].join(" ")}>
                {value}
            </button>
            </td>
        </>
    )
}