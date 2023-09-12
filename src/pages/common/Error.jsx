import styles from './error.module.css'

export const NotResultData = () => {
    return (
        <>
            <div className={styles.container}>
                {/* <img src="/notData.gif"/> */}
                <div>조회할 데이터가 없습니다.</div>
            </div>
        </>
    )
}

