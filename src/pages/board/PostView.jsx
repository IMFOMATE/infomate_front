import mainCSS from '../../components/common/main.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import PostCSS from './PostView.module.css';
import {LoadingSpiner} from '../../components/common/other/LoadingSpiner'
import ReactQuill from 'react-quill';
import PostingCSS from './Posting.module.css';

import{
    callPostViewAPI,
    callPostUpdateAPI,
    callPostDeleteAPI
} from '../../apis/BoardAPICalls'

function PostView() {

    const quillRef = useRef(null);
    const dispatch = useDispatch();
    const params = useParams();
    const post = useSelector(state => state.boardReducer); 

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
    if(post.length > 0) return <LoadingSpiner />

    const onClickPostModifyHandler = () => {  // 수정 모드
      setModifyMode(true);
      setForm({
        postCode: post.postCode,
        postTitle: post.postTitle,
        postDate: post.postDate,
        postContents: post.postContents,
        boardCategory: post.boardCategory,
        boardCode: post.boardCode,
        memberCode: post.memberCode,
        postViews: post.postViews,
      });
    }

    const onChangeHandler = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      });
  };

      
    const onClickPostUpdate = () => {
      console.log('postCode');

      dispatch(callPostUpdateAPI({
        postCode: post.postCode,
        form
      }));

      alert('수정완료');
      navigate((-1), {replace: false});
      window.location.reload();
    }


    const onClickPostDeleteHandler = () => {
      if (window.confirm('게시글을 삭제하시겠습니까?')) {
        try {
          dispatch(callPostDeleteAPI(params.postCode));

          console.log('[PostDelete] postCode : ', params.postCode);
          alert('게시글이 삭제되었습니다.');
          navigate((-1), { replace: false });
        } catch (error) {
          console.error('게시글 삭제 중 오류 발생: ', error);
        }
      }
    };



    const titleStyle = {    // 제목 CSS
      marginLeft: '3%',
      padding: '7px',
      paddingInline: '20px',
      marginTop: '40px',
      fontSize: '23px',
      fontWeight: '600',
    };

    const titleStyles = {    // 제목 CSS
      marginLeft: '3%',
      padding: '10px',
      paddingInline: '10px',
      marginTop: '40px',
      fontSize: '13px',
      fontWeight: '400',
      border: '1px solid #ddd',
      width: '93%'
    };

    const contentsStyle = { // 내용 CSS
      marginLeft: '20px',
      marginBottom: '10px',
      marginRight: '20px'
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
          style={ (!modifyMode ? titleStyle : titleStyles) || ''}
          ></input>

          {!modifyMode ? (
          <div className={ PostCSS.actfnt}>{post.memberCode} | {post.postDate} | {post.postCode} | {post.postViews} </div>
          ) : '' }
      
        
        
        
        
        {modifyMode ? (
          <div className={PostingCSS.postmargin}>
        <div className={PostCSS.quill}>
          <ReactQuill
           name='postContents'
           placeholder="내용을 입력해주세요."
           ref={quillRef}
           modules={{
           toolbar: toolbarOptions,
        }}
        value={modifyMode ? form.postContents : post.postContents}
           onChange={(value, delta, source, editor)=>{
            const newContents = editor.getHTML();
                        setForm((prev)=> ({...prev, postContents:editor.getHTML()}))
                    }}
          /></div>
          <button
            className={PostCSS.boardupdate}
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
            onClick={onClickPostDeleteHandler}>
              삭제하기
          </button>
        }
        </div>

    </>
    );
}

export default PostView;