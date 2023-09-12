import mainCSS from '../../components/common/main.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import PostCSS from './PostView.module.css';
import {LoadingSpiner} from '../../components/common/other/LoadingSpiner'
import ReactQuill from 'react-quill';

import{
    callPostViewAPI,
    callPostUpdateAPI
} from '../../apis/BoardAPICalls'

function PostView() {

    const quillRef = useRef(null);
    const dispatch = useDispatch();
    const params = useParams();
    const post  = useSelector(state => state.boardReducer); 

    console.log('post',post);

    const [modifyMode, setModifyMode] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState({});

    useEffect(() => {
      if(post.length > 0) return ;

          console.log('[PostUpdate] postCode : ', params.postCode);

          dispatch(callPostViewAPI({	
              postCode: params.postCode
          }));                     
      }
  ,[]);
    if(post.length < 1) return <LoadingSpiner />

    const onClickPostModifyHandler = () => {
      setModifyMode(true);
      setForm({
        postCode: post.postCode,
        postTitle: post.postTitle,
        postDate: post.postDate,
        postContents: post.postContents,
        boardCategory: post.boardCategory,
        boardCode: post.boardCode,
        memberCode: post.memberCode,
      });
    }

    const onChangeHandler = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      });
  };

      
    const onClickPostUpdate = (postCode) => {
      console.log(postCode);
      navigate((0), {replace: false});
    }

    const titleStyle = {    // 제목 CSS
      marginLeft: '3%',
      paddingInline: '20px',
      marginTop: '40px',
      fontSize: '23px',
      fontWeight: '600',
    };

    const contentsStyle = { // 내용 CSS

    }

    const toolbarOptions = [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', "image", "video"]
    ]; 

    

    return (
<>
        <div className={mainCSS.maintitle}>
        <h2>{post.boardCategory}</h2>
        </div>
        
        
              <input
                  name='postTitle'
                  placeholder="제목을 입력해주세요."
                  value={ (!modifyMode ? post.postTitle : form.postTitle) || ''}
                  onChange={ onChangeHandler }
                  readOnly={ modifyMode ? false : true }
                  style={titleStyle}
                  ></input>
              <div className={ PostCSS.actfnt}>{post.memberCode} | {post.postDate} | {post.postCode} | 조회수 </div>
            
           
        
        
        
        
        {modifyMode ? (
        <div className={PostCSS.quill}>
          <ReactQuill
           name='postContents'
           placeholder="내용을 입력해주세요."
           ref={quillRef}
           modules={{
           toolbar: toolbarOptions
            
        }}
           onChange={(value, delta, source,editor)=>{
                        setForm((prev)=> ({...prev, postContents:editor.getHTML()}))
                    }}
          />
          <button
            className={PostCSS.boardupload}
            onClick={onClickPostUpdate}
          >
            수정완료
          </button>
        </div>
      ) : (
        <div className={PostCSS.postcont}>
          {post.postContents}
        </div>
      )}
      
      <div className={ PostCSS.boardcontentsline}></div>
        <div className={ PostCSS.naranhe}>
        {!modifyMode &&
          <button 
            className={ PostCSS.boardupload} 
            onClick={onClickPostModifyHandler}>
              수정하기
          </button>
        }
        {!modifyMode &&
          <button 
            className={ PostCSS.boarddelete} 
            onClick={onClickPostModifyHandler}>
              삭제하기
          </button>
        }
        </div>

    </>
    );
}

export default PostView;