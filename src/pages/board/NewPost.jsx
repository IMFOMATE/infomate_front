import mainCSS from '../../components/common/main.module.css';
import BoardCSS from './Board.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import PostTable from '../../components/board/Post';

import{
    callhBoardViewAPI
} from '../../apis/BoardAPICalls'
import NewButton from '../../components/board/NewButton';

function NewPost() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const board  = useSelector(state => state.boardReducer);      
    const boardList = board?.data; 
    console.log('boardManagement', boardList);

    // 페이징
    const pageInfo = board?.pageInfo || {};

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= Math.min(pageInfo.pageEnd, 5) ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            setStart((currentPage - 1) * 5);
            dispatch(
                callhBoardViewAPI({
                    currentPage: currentPage,
                })
            );
        },
        [currentPage]
    );

    

    // 게시글페이지
    const postHandler = (postCode) => {
        navigate(`/board/post/${postCode}`, { replace: false });
    }


    return (
        <>

        <div className={mainCSS.maintitle}>
        <h2>최근 게시글</h2>
        </div>
            <div style={{padding: '10px'}}>
                <NewButton />
            </div>
                      
            <table className={BoardCSS.bdtable}>
                <PostTable />
                <tbody>
                    { Array.isArray(boardList) && boardList.map((b, index) => (
                        <tr className={BoardCSS.bdtable_tr}
                            key={ b.boardCode }
                            // key={index}
                            onClick={ () => postHandler(b.postCode) }
                        >
                            <td className={BoardCSS.bdtable_td}>{ b.postCode }</td>
                            <td className={BoardCSS.bdtable_td}>{ b.postTitle }</td>
                            <td className={BoardCSS.bdtable_td}>{ b.member.memberName }</td>
                            <td className={BoardCSS.bdtable_td}>{ b.postDate }</td>
                            <td className={BoardCSS.bdtable_td}>1</td>
                        </tr>
                    )) 
                    }
                </tbody>
            </table>
                <div style={{ listStyleType: "none", display: "flex", justifyContent: "center"}} >
                    { Array.isArray(boardList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage -1)}
                        dsabled={currentPage === 1}
                        className={ BoardCSS.pagination }
                    >
                    &lt;
                    </button>
                    }
                    { pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)} >
                        <button
                            style={ currentPage === num ? { backgroundColor : '#9e88fe', color : 'white'} : null }
                            className={ BoardCSS.pagination }
                        >
                            {num}
                        </button>
                    </li>
                    ))}
                    { Array.isArray(boardList) &&
                    <button
                        className={ BoardCSS.pagination }
                        onClick={() => setCurrentPage(currentPage +1)}
                    >
                        &gt;
                        </button>
                        }
                </div>
            
       

        </>
    );
}

export default NewPost;