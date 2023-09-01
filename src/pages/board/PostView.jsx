import mainCSS from '../../components/common/main.module.css';
import boardCSS from '../board/Board.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import PostCSS from './PostView.module.css';

import {
    callPostViewAPI
} from '../../apis/BoardAPICalls'

function PostView() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const product  = useSelector(state => state.productReducer);  

    useEffect(
        () => {
            dispatch(callPostViewAPI({
                postCode: params.postCode
            }));
        }
    )

    

    return (

    <div>
        <div className={mainCSS.maintitle}>
        <h2>일반 게시판</h2>
        </div>

        <div className={ PostCSS.boardtitle }>제목</div>
        <div className={ PostCSS.actfnt}>작성자 작성일 게시글코드 조회수 </div>
        <h4>내용이 들어갈건데 그걸 어떻게 불러올지 모르겠음</h4>

        <div className={ PostCSS.boardcontentsline }></div>
        <div className={ PostCSS.naranhe }>
        <div className={ PostCSS.boardupload}>수정하기</div>
        <div className={ PostCSS.boarddelete}>삭제하기</div>
        </div>
    </div>

    );
}

export default PostView;