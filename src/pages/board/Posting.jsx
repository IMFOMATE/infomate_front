import React from "react";
import mainCSS from '../../components/common/main.module.css';
import PostingCSS from './Posting.module.css';
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from "react-quill";
import PostCSS from './PostView.module.css'

import{
    callPostPostAPI
} from '../../apis/BoardAPICalls'

function Posting() {  

    // 디스패치.. 근데 밑에 두 개는 왜 있는지 모르겠음
    const dispatch = useDispatch();
    const params = useParams();
    const post = useSelector(state => state.postReducer);


    // form 데이터 ==========================
    const [form, setForm] = useState({
        postCode: 0,
        postTitle: '',
        postDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
        postContents: '',
        boardCategory: 0, 
        board: { boardCode : ''},
        member: {
            memberName: '',
            memberCode: 0
        }
      

    });

 const changeContent = (editor) => {
    
    
 }


    /* form 데이터 세팅 */   
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
    
        if (name === 'boardCategory') {
          const boardCode = setBoardCode(value);
          setForm({
            ...form,
            [name]: value,
            board: { boardCode : boardCode}
          });
        } else {
          setForm({
            ...form,
            [name]: value
          });
        }
      };

      const setBoardCode = (category) => {  // 카테고리명으로 게시판 코드 조회하기
        switch (category) {
          case '공지사항':
            return 101;
          case '일반게시판':
            return 102;
          case '익명게시판':
            return 103;
          case '부서게시판':
            return 104;
          default:
            return '';
        }
      };


    

      // useEffect(() => {
      //   async function fetchMemberInfo() {
      //     try {
      //       const response = await callPostPostAPI(form.memberCode);
    
      //       if (response.success) {
      //         setForm((prev) => ({ ...prev, memberName: response.data.memberName }));
      //       } else {
      //         console.error('멤버 정보 조회 실패:', response.error);
      //       }
      //     } catch (error) {
      //       console.error('API 호출 중 오류 발생:', error);
      //     }
      //   }
    
      //   fetchMemberInfo();
      // }, [form.memberCode]);
    


    /* form 데이터 */
    const postPostHandler = () => {
        console.log('postPostHandler');

        // const formData = new FormData();

        // formData.append("postCode", form.postCode);
        // formData.append("postTitle", form.postTitle);
        // formData.append("postDate", form.postDate);
        // formData.append("postContents", form.postContents);
        // formData.append("boardCategory", form.boardCategory);
        // formData.append("board", { "boardCode": form.boardCode});
        // formData.append("member", { "memberCode": '22'});

        // for(let [name, value] of formData ) {
        //     console.log("========",name)
        //     console.log("==============",value)

        // }
        // append : 필드와 값을 추가하는 메서드 (필드, 값);

        // console.dir(formData);
        
        dispatch(callPostPostAPI({
            form
        }));

        alert('작성완료');
        navigate('/board/newpost', { replace: false});
        window.location.reload();

        
    }


    //=====================================

    //
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const navigate = useNavigate();
    // 

    // 작성폼에 들어갈 폰트 옵션
    const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', "image", "video"]
      ]; 
 
      const quillRef = useRef(null);
    //   ============================

     const postHandler = (postCode) => {
        navigate(`/board/post/${postCode}`, { replace: false });
    }

    return (
        <>
    
        <div className={mainCSS.maintitle}>
        <h2>새 글 작성</h2>
        </div>
        
            <div>
                <select name="boardCategory" 
                        className={PostingCSS.category}
                        onChange={onChangeHandler}>
                    <option value="" >게시판을 선택해주세요</option>
                    <option value="일반게시판" className={PostingCSS.drdown}>일반게시판</option>
                    <option value="익명게시판" className={PostingCSS.drdown}>익명게시판</option>
                    <option value="부서게시판" className={PostingCSS.drdown}>부서게시판</option>
                    <option value="보고사항" className={PostingCSS.drdown}>보고사항</option>
                </select>
            </div>


        {/* 작성 폼 */}

        
        <input 
        className={PostingCSS.title} 
        placeholder="제목을 입력해주세요."
        name='postTitle'
        onChange={onChangeHandler}>
        
        </input>
        <div className={PostingCSS.postmargin}>
        <div className={PostCSS.quill}>
            <ReactQuill
            name='postContents'
            placeholder="내용을 입력해주세요."
            ref={quillRef}
                    modules={{
                        toolbar: toolbarOptions
                        
                    }}
                    theme="snow"
                    onChange={(value, delta, source,editor)=>{
                        setForm((prev)=> ({...prev, postContents:editor.getHTML()}))
                    }}
                    />
                    
        </div></div>
        {/*  */}

        {/*  */}

    <div className={PostingCSS.postside}>
        <button onClick={() => navigate(-1)}>
            <div className={PostingCSS.postpost}>
            작성취소
            </div>
        </button>
        <button onClick={postPostHandler}>
            <div className={PostingCSS.postpost}>
            작성완료
            </div>
        </button>
    </div>
        {/*  */}
        
        </>
    )
}

export default Posting;