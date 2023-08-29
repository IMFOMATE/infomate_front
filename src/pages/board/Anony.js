import mainCSS from '../../components/common/main.module.css';
import BoardCSS from './Board.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from "react";

import{
    callhBoardViewAPI
} from '../../apis/BoardAPICalls'

function Notice() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const boards  = useSelector(state => state.boardReducer);      
    const boardList = boards?.data; 
    console.log('boardManagement', boardList);

    //const pageInfo = boards.pageInfo;

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    // const pageNumber = [];
    // if(pageInfo){
    //     for(let i = 1; i <= pageInfo.pageEnd ; i++){
    //         pageNumber.push(i);
    //     }
    // }

    useEffect(
        () => {
            // setStart((currentPage - 1) * 5);            
            dispatch(callhBoardViewAPI());            
        }
        ,[]
    );

    const onClickBoardInsert = () => {
        console.log('[BoardManagement] onClickBoardInsert');
        navigate("/board-registration", { replace: false })
    }

    const onClickTableTr = (boardCode) => {
        navigate(`/board-update/${boardCode}`, { replace: false });
    }

    return (
        <>

        <div className={mainCSS.maintitle}>
        <h2>익명 게시판</h2>
        </div>

            
                <button onClick={ onClickBoardInsert }>
                    <div className={ BoardCSS.newpost }>
                        글쓰기
                    </div>  
                </button>
                      
            <div className={BoardCSS.bdtable}>
                <colgroup>
                  <col width="10%" />
                    <col width="60%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th className={BoardCSS.bdtable_th}>No.</th>
                        <th className={BoardCSS.bdtable_th}>제목</th>
                        <th className={BoardCSS.bdtable_th}></th>
                        <th className={BoardCSS.bdtable_th}>작성일</th>
                        <th className={BoardCSS.bdtable_th}>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(boardList) && boardList.map((b) => (
                        <tr className={BoardCSS.bdtable_tr}
                            key={ b.boardCode }
                            onClick={ () => onClickTableTr(b.boardCode) }
                        >
                            <td className={BoardCSS.bdtable_td}>{ b.postCode }</td>
                            <td className={BoardCSS.bdtable_td}>{ b.postTitle }</td>
                            <td className={BoardCSS.bdtable_td}></td>
                            <td className={BoardCSS.bdtable_td}>{ b.postDate }</td>
                            <td className={BoardCSS.bdtable_td}>{ b.postCode }</td>
                        </tr>
                    )) 
                    }
                </tbody>           
                         
            </div>         
            
       
        </>
    );
}

export default Notice;