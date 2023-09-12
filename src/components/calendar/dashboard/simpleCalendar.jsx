import styles from './day.module.css';

export const Day = ({today, value, data, isHeader, isCurMonth, isSun, isSur, onClick}) => {
    const dateLabel = ['일','월','화','수','목','금','토'];

    return (
        <>
            <td className={[styles.dayContainer].join(' ')}>
                <span className={[styles.count, today && styles.countToday].join(' ')}>
                    {data?.length > 0 && data[0]?.count}
                </span>
                <button 
                    className={[today && styles.today,
                         isHeader && styles.header,
                         isSun && styles.sun,
                         isSur && styles.sur,
                         (!isCurMonth && !isHeader) && styles.notCurMonth
                        ].join(" ")} 
                    id={dateLabel.includes(value) ? value : value.format('YYYY-MM-DD')} 
                    onClick={onClick}
                    disabled={dateLabel.includes(value)}
                >
                    {dateLabel.includes(value) ? value : value.format('D')}
                </button>
            </td>
        </>
    )
}