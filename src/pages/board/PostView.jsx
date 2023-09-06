import mainCSS from '../../components/common/main.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import PostCSS from './PostView.module.css';
import {LoadingSpiner} from '../../components/common/other/LoadingSpiner'

import{
    callPostViewAPI
} from '../../apis/BoardAPICalls'

function PostView() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const post  = useSelector(state => state.boardReducer); 
    const postCode = params.postCode;

    console.log('postCode', postCode);
    console.log('-------',post);
    
    useEffect(() => {
      if(post.length > 0) return ;
      console.log('PostView 컴포넌트가 렌더링 됨'); // 컴포넌트가 렌더링될 때 로그 출력

      dispatch(callPostViewAPI({
          postCode: postCode
      }))
      
  }, [dispatch, postCode]);


  

  if(post.length < 1) return <LoadingSpiner />

    
    const onClickPostUpdate = (postCode) => {
      console.log(postCode);
      navigate(`/board/${postCode}/update`, {replace: false});
    }

    console.log(post);


    return (
<>
        <div className={mainCSS.maintitle}>
        <h2>{post.boardCategory}</h2>
        </div>

              <div className={ PostCSS.boardtitle }>{post.postTitle}</div>
              <div className={ PostCSS.actfnt}>작성자 | {post.postDate} | {post.postCode} | 조회수 </div>
              <div className={ PostCSS.postcont}>{post.postContents}</div>
           
                <div className={ PostCSS.boardcontentsline}></div>
        
        <div className={ PostCSS.naranhe}>
          <button 
            className={ PostCSS.boardupload} 
            onClick={onClickPostUpdate}>
              수정하기
          </button>
        <div className={ PostCSS.boarddelete}>삭제하기</div>
        </div>
    
                
    </>
    );
}

export default PostView;