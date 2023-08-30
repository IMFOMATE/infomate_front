import mainCSS from '../../components/common/main.module.css';
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
        <div className={mainCSS.maintitle}>
        <h2>일반 게시판</h2>
        </div>

    );
}

export default PostView;