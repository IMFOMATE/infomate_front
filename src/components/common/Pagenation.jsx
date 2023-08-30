import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import meterailIcon from './meterialIcon.module.css'
import styles from './pagenation.module.css'

export const Pagenation = ({prev, next, total, pageNum}) => {
    
    const [search] = useSearchParams();
    
    const navigate = useNavigate();
    const pageMove = (pageNum) => {
        console.log(pageNum);
        navigate({
            pathname: '.',
            search: `${createSearchParams({
                size: search.get('size') || 10,
                page: pageNum,
            })}`
        })
    }    

    return(
        <div className={styles.container}>
            {
                prev && pageNum - 4 > 0 &&
                <button><span className={[meterailIcon.meterialIcon, styles.iconSize].join(' ')}>keyboard_double_arrow_left</span></button>
            }
            {
                parseInt(pageNum+1) > 1 &&
                <button><span className={[meterailIcon.meterialIcon, styles.iconSize].join(' ')}>navigate_before</span></button>
            }
            

            {
                [...Array(7).keys()]
                .map(pageNo => pageNo + pageNum - 3)
                .filter(pageNo => pageNo > 0 && pageNo <= total)
                .map(pageNo => <button onClick={()=>pageMove(pageNo)}><span className={pageNum + 1 === pageNo && styles.active}>{pageNo}</span></button>)
            }            
            {
                parseInt(pageNum+1) < parseInt(total) &&
                <button><span className={[meterailIcon.meterialIcon, styles.iconSize].join(' ')}>navigate_next</span></button>
            }
            {
                next && pageNum + 4 <= total &&
                <button><span className={[meterailIcon.meterialIcon, styles.iconSize].join(' ')}>keyboard_double_arrow_right</span></button>
            }
        </div>
    )
}