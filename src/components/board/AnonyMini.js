import mainCSS from '../../components/common/main.module.css';
import BoardCSS from '../../pages/board/Board.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import PostTable from './Post';

import{
    callMainBoardViewAPI
} from '../../apis/BoardAPICalls'

function Anony() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const board  = useSelector(state => state.boardReducer);      
    const boardList = board?.data; 
    console.log('boardManagement', boardList);

    // 페이징
    const pageInfo = board.pageInfo;

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            setStart((currentPage - 1) * 5);            
            dispatch(callMainBoardViewAPI({ 
                currentPage: currentPage} ));
        }
        ,[currentPage]
    );

    
    return (
        <>

            <table className={BoardCSS.bdtable}>
                <PostTable />
                <tbody>
                    { Array.isArray(boardList) && boardList.map((b, index) => (
                        <tr className={BoardCSS.bdtable_tr}
                            key={ b.boardCode }
                            // key={index}
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
            </table>
                
            
        </>
    );
}

export default Anony;