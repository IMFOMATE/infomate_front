import BoardCSS from '../../pages/board/Board.module.css';

function PostTable() {

    return (
        <>
        <colgroup>
                    <col width="10%" />
                    <col width="50%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th className={BoardCSS.bdtable_th}>No.</th>
                        <th className={BoardCSS.bdtable_th}>제목</th>
                        <th className={BoardCSS.bdtable_th}>작성자</th>
                        <th className={BoardCSS.bdtable_th}>작성일</th>
                        <th className={BoardCSS.bdtable_th}>조회</th>
                    </tr>
                </thead>
        </>
    )
}

export default PostTable;