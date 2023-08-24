import React from 'react';
import NavStyle from "../../components/common/Nav.module.css";

function Board() {
    return (
        <div className={NavStyle.sidemenu}>
            <div className={NavStyle.sideTop}>
                <h1>Board</h1>
                <a href="/">글쓰기</a>
            </div>
            <div className={NavStyle.sideList}>
            </div>
        </div>
    );
}

export default Board;