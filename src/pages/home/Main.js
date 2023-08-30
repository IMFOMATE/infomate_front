import MainStyle from './Main.module.css';

function Main() {
    // isAdmin이 !true라고 가정
    const isAdmin = !true;

    return (
        <div className={MainStyle.header}>
            <h3>메인페이지</h3>
            {isAdmin && <button className={MainStyle.regist}>회원 등록</button>}
        </div>
    );
}

export default Main;
