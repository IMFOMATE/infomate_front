import React from "react";


function PostViewer() {
    return (
                <>
                <h1>제목</h1>
                    <span>{new Date().toLocaleDateString()}</span>  
                    </>
    )
}

export default PostViewer;