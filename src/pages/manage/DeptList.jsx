import  { React, useEffect } from "react";
import {Link} from "react-router-dom";
import SdeptCss from "./SearchDept.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    callDeptListAPI
} from '../../apis/EmployeeAPI';
// import { FadeLoader } from "react-spinners";
// import StylesLoading from '../calendar/loadingStyle.module.css';

function DeptList() {

    const dispatch = useDispatch();
    const deptList = useSelector(state => state.employeeReducer);

    useEffect(
        () => {
            dispatch(callDeptListAPI());
        },
        []
    )
    


    return(
        <>
                {
                    deptList.map((mamber, index) =>
                    <tr key={index} className={SdeptCss.tr}>
                        <td>{mamber.data.empName}</td>  
                        <td>{mamber.data.empNum}</td>   
                        <td>{mamber.data.deptName}</td>   
                        <td><Link to='/memberInfo' className={SdeptCss.board_link}>
                            <button className={SdeptCss.bnt}>정보</button>
                            </Link></td>
                    </tr>
                    )            
                }

        </>
    );



    
}



export default DeptList;
