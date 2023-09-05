import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from "react";
import {LoadingSpiner} from '../../components/common/other/LoadingSpiner'

import{
    callPostUpdateAPI
} from '../../apis/BoardAPICalls'

function PostUpdate() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    // const imageInput = useRef();

    const post  = useSelector(state => state.boardReducer); 
    const postCode = params.postCode;

    console.log('postCode', postCode);

    const [form, setForm] = useState({
        postCode: '',
        postTitle: '',
        postDate: '',
        postContents: '',
        boardCategory: '',
        boardCode: '',
        memberCode: ''
    });

    //


    useEffect(() => {
            if(post.length > 0) return ;

            dispatch(callPostUpdateAPI({	
                productCode: params.productCode
            }));                     
        }
    ,[postCode]);

    if(post.length < 1) return <LoadingSpiner />



    /////

    // form 데이터 세팅    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const onClickPostUpdateHandler = () => {

        console.log('[PostUpdate] onClickPostUpdateHandler');

        const formData = new FormData();
        formData.append("postCode", form.postCode);
        formData.append("postTitle", form.postTitle);
        formData.append("postDate", form.postDate);
        formData.append("postContents", form.postContents);
        formData.append("boardCategory", form.boardCategory);
        formData.append("boardCode", form.boardCode);
        formData.append("memberCode", form.memberCode);

        // if(image){
        //     formData.append("postImage", image);
        // }

        dispatch(callPostUpdateAPI({	// 상품 정보 업데이트
            form: formData
        }));         

    return(
    <>

            <button       
                onClick={ onClickPostUpdateHandler }             
            >
                상품 수정 저장하기
            </button>
    </>
    )
    }
}

export default PostUpdate;