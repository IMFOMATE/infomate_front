import  { React, useState } from "react";
import UpdateCss from './UpdateList.module.css';



function DeptItems(){      

    




    return(
        <>
            <tr className={`tr ${UpdateCss.tr}`}>
                <td>1</td>
                <td>영업팀</td>
                <td>30</td>
                <td><button>수정하기</button></td>
            </tr>
        </>
    )
}



export default DeptItems;