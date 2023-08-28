import React from "react";
import mainCSS from '../../components/common/main.module.css';
import PostingCSS from './Posting.module.css';
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function Posting() {

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const navigate = useNavigate();


    return (
        <>

        <div className={mainCSS.maintitle}>
        <h2>새 글 작성</h2>
        </div>

        {/*  */}
        
        <div className={PostingCSS.back}>
            <button onClick={() => navigate(-1)}>
            작성취소
            </button>
        </div>
        <div className={PostingCSS.back}>작성완료</div>

        {/*  */}
        
        
        
        </>
    )
}

export default Posting;