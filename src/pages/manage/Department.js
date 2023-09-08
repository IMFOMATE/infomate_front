import  { ReactInstance } from "react";
import { useNavigate} from "react-router-dom";
import SdeptCss from "./SearchDept.module.css";
import { MEMBER_CODE } from "../../apis/APIConfig";


function Department({ dept : {memberName, memberCode, department}}) {

    const navigate = useNavigate();

    const onClickDeptHandler = (MEMBER_CODE) => {
        navigate(`/emp/info/${MEMBER_CODE}`, { replace: false});
    }



    return(
        <>
                    <tr className={SdeptCss.tr}>
                        <td>{memberName}</td>  
                        <td>{memberCode}</td>   
                        <td>{department.deptName}</td>   
                        <td>
                            <button 
                            className={SdeptCss.bnt} 
                            onClick={ () => onClickDeptHandler(MEMBER_CODE)}
                            >정보</button>
                        </td>
                    </tr>
        </>
    );



    // return(
    //     <>
    //             {
    //                 deptList.map((mamber, index) =>
    //                 <tr key={index} className={SdeptCss.tr}>
    //                     <td>{mamber.empName}</td>  
    //                     <td>{mamber.empNum}</td>   
    //                     <td>{mamber.deptName}</td>   
    //                     <td><Link to={mamber.link} className={SdeptCss.board_link}>
    //                         <button className={SdeptCss.bnt}>정보</button>
    //                         </Link></td>
    //                 </tr>
    //                 )            
    //             }

    //     </>
    // );
}



export default Department;
