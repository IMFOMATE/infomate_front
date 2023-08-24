import React from "react";
import {Link} from "react-router-dom";
import SdeptCss from "./SearchDept.module.css";


function DeptList({data}) {



    return(
        <>
                {
                    data.map((m, index) =>
                    <tr key={index} className={SdeptCss.tr}>
                        <td>{m.name}</td>
                        <td>{m.num}</td>
                        <td>{m.dept}</td>
                        <td><Link to={m.link} className={SdeptCss.board_link}>
                            <button className={SdeptCss.bnt}>정보 </button>
                            </Link></td>
                    </tr>
                    )            
                }

        </>
    );
}



export default DeptList;
