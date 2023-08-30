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

    const postHandler = () => {
        navigate(`/post/${params.postCode}`, {replace: false});
    }

    return (
        <div></div>

    );
}

export default PostView;