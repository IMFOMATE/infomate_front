import mainCSS from '../../components/common/main.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import PostCSS from './PostView.module.css';

import{
    callPostViewAPI
} from '../../apis/BoardAPICalls'

function PostView() {

    const dispatch = useDispatch();
    const params = useParams();
    const postCode = params.postCode;

    useEffect(() => {
      console.log('PostView 컴포넌트가 렌더링됨'); // 컴포넌트가 렌더링될 때 로그 출력

      dispatch(callPostViewAPI({
          postCode: postCode
      }))
      .then(result => {
          console.log('API 요청 완료:', result); // API 요청이 완료될 때 로그 출력
      })
      .catch(error => {
          console.error('API 요청 오류:', error); // API 요청 오류 시 로그 출력
      });
  }, [dispatch, postCode]);


    const board  = useSelector(state => state.boardReducer);      
    const boardList = board?.data; 

    console.log(board);

    


    return (
<>
        <div className={mainCSS.maintitle}>
        <h2>일반 게시판</h2>
        </div>

        {Array.isArray(boardList) && (
          <ul>
            {boardList.map((p) => (
                   <li key={p.boardCode}>
                    <div className={ PostCSS.boardtitle }>{p.postTitle}</div>
                    <div className={ PostCSS.actfnt}>작성자(멤버코드) | {p.postDate} | {p.postCode} | 조회수 </div>
                    <div >{p.postContents}</div>
                   </li>
                 ))}
               </ul>
             )}
        <div className={ PostCSS.boardcontentsline}></div>
        
        <div className={ PostCSS.naranhe}>
        <div className={ PostCSS.boardupload}>수정하기</div>
        <div className={ PostCSS.boarddelete}>삭제하기</div>
        </div>
    
                
    </>
    );
}

export default PostView;