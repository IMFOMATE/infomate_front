import React from "react";
import mainCSS from '../../components/common/main.module.css';
import PostingCSS from './Posting.module.css';
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from "react-quill";

import{
    callPostUpdateAPI,
    callPostViewAPI
} from '../../apis/BoardAPICalls'

function PostUpdate() {  

   const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const post = useSelector(state => state.boardReducer);
    const postCode = params.postCode;
    const [modifyMode, setModifyMode] = useState(false);
    


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


    // const [form, setForm] = useState(post)

 useEffect(        
        () => {
            console.log('[PostUpdate] postCode : ', PostUpdate);

            dispatch(callPostViewAPI({	
              postCode: postCode
            }));                     
        }
    ,[dispatch, postCode]);

    console.log('postCode = ', postCode);

    useEffect(() => {
    
      if (post && post.length > 0) {
          const postData = post[0];
          setForm({
              postCode: postData.postCode,
              postTitle: postData.postTitle,
              postDate: postData.postDate,
              postContents: postData.postContents,
              boardCategory: postData.board.boardCategory,
              board: { boardCode: postData.board.boardCode },
              member: {
                  memberName: postData.member.memberName,
                  memberCode: postData.member.memberCode
              }
          });
      }
  }, []);

    /* form 데이터 세팅 */   
    const onChangeHandler = (e) => {
      console.log(e.target);
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


      useEffect(() => {
        if(post && post.length > 0) return ;
        console.log('PostView 컴포넌트가 렌더링 됨');
  
        dispatch(callPostViewAPI({
            postCode: postCode
        }))
        
    }, [dispatch, postCode]);
    


    /* form 데이터 */
    const postPostHandler = () => {
        console.log('postPostHandler');
        
        dispatch(callPostUpdateAPI({
            form
        }));

        alert('작성완료');
        navigate(`/board/post/${postCode}`, { replace: false});
        window.location.reload();

        
    }

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


    return (
        <>
        <div className={mainCSS.maintitle}>
        <h2>{post.boardCategory}</h2>
        </div>

        {!modifyMode &&
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
        }

        {/* 작성 폼 */}

        
        <input 
        className={PostingCSS.title} 
        value={form.postTitle}
        placeholder="제목을 입력해주세요."
        name='postTitle'
        onChange={ onChangeHandler }
        disabled
        />
          
        
        
        <div className={PostingCSS.postmargin}>
            <ReactQuill
            name='postContents'
            placeholder="내용을 입력해주세요."
            readOnly={true}
            ref={quillRef}
                    modules={{
                        toolbar: toolbarOptions
                        
                    }}
                    theme="snow"
                    value={post.postContents}
                    // onChange={(value, delta, source,editor)=>{
                    //     setForm((prev)=> ({...prev, postContents:editor.getHTML()}))
                    // }}
                    onChange={e=>console.log(e)}
                    />
                    
        </div>
        {/*  */}

        {/*  */}
                    
    <div className={PostingCSS.postside}>
        <button onClick={postPostHandler}>
            <div className={PostingCSS.postpost}>
            수정완료
            </div>
        </button>
    </div>
        {/*  */}
        
        </>
    )
}

export default PostUpdate;