import mainCss from '../../components/common/main.module.css';
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

        <div className={mainCss.maintitle}>
        <h2>공지사항</h2>
        </div>

        <div className={ BoardCSS.bodyDiv }>
            <div className={ BoardCSS.buttonDiv }>
                <button
                    onClick={ onClickBoardInsert }
                >
                    글쓰기
                </button>
            </div>            
            <table className={ BoardCSS.boardTable }>
                <colgroup>
                    <col width="15%" />
                    <col width="60%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th> {/* 직원코드로 불러오기? 가능? */}
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(boardList) && boardList.map((p) => (
                        <tr
                            key={ p.boardCode }
                            onClick={ () => onClickTableTr(p.boardCode) }
                        >
                            <td>{ p.postCode }</td>
                            <td>{ p.postTitle }</td>
                            <td>{ p.memberCode }</td>
                            <td>{ p.postDate }</td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>         
            
        </div>
       
        </>
    );
}

export default Notice;