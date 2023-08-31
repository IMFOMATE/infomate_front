import mainCSS from '../../components/common/main.module.css';
import boardCSS from '../board/Board.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

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

        <h3>제목</h3>
        <h6>작성자 작성일 게시글코드 조회수 </h6>
        <h5>---------------------------------------------</h5>
        <h4>내용</h4>
        <h5>완전 밑에 수정하기, 삭제하기</h5>
    </div>

    );
}

export default PostView;