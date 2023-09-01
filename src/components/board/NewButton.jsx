import BoardCSS from '../../pages/board/Board.module.css';
import { useNavigate } from 'react-router-dom';

function NewButton() {

    const navigate = useNavigate();

     // 글쓰기
     const postPostHandler = () => {
        console.log('[BoardManagement] postPostHandler');
        navigate("/board/posting", { replace: false })
    }
    
    return(

        <button onClick={ postPostHandler }>
                    <div className={ BoardCSS.newpost }>
                        글쓰기
                    </div>  
                </button>

    )
}

export default NewButton;