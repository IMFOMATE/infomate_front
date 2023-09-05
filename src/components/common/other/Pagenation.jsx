import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import meterailIcon from '../meterialIcon.module.css'
import styles from './pagenation.module.css'

export const Pagenation = ({total, pageNum}) => {
    
    const [search] = useSearchParams();
    pageNum += 1; // pageNum 0부터 시작 pgae처리 1부터 시작 
    const navigate = useNavigate();

    const pageMove = (pageNum) => {
        navigate({
            search: `${createSearchParams({
                size: search.get('size') || 20,
                page: pageNum,
                
            })}`
        })
    }    

    return(
        <div className={styles.container}>
            {
                pageNum - 4 > 0 &&
                <button onClick={()=>pageMove(pageNum - 4)}>
                    <span className={[meterailIcon.meterialIcon, styles.iconSize].join(' ')}>
                        keyboard_double_arrow_left
                    </span>
                </button>
            }
            {
                parseInt(pageNum) > 1 &&
                <button onClick={()=>pageMove(pageNum - 1)}>
                    <span className={[meterailIcon.meterialIcon, styles.iconSize].join(' ')}>
                        navigate_before
                    </span>
                </button>
            }
            {
                [...Array(7).keys()]
                .map(pageNo => pageNo + pageNum - 3)
                .filter(pageNo => pageNo > 0 && pageNo <= total)
                .map(pageNo => 
                    <button key={pageNo} onClick={()=>pageMove(pageNo)} disabled={pageNum === pageNo}>
                        <span className={pageNum === pageNo && styles.active}>
                            {pageNo}
                        </span>
                    </button>
                )
            }            
            {
                parseInt(pageNum) < parseInt(total) &&
                <button  onClick={()=>pageMove(pageNum + 1)}>
                    <span className={[meterailIcon.meterialIcon, styles.iconSize].join(' ')}>
                        navigate_next
                    </span>
                </button>
            }
            {
                pageNum + 4 <= total &&
                <button onClick={()=>pageMove(pageNum + 4)}>
                    <span className={[meterailIcon.meterialIcon, styles.iconSize].join(' ')}>
                        keyboard_double_arrow_right
                    </span>
                </button>
            }
        </div>
    )
}