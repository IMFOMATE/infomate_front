import {React, useEffect} from 'react';
import GroupCss from '../Group.module.css';
import UpdateCss from'./UpdateList.module.css';
import UpdateList from './UpdateList';
import 
{ callDeptAlltAPI } from '../../../apis/EmployeeAPI';
import { useDispatch, useSelector } from "react-redux";
import { LoadingSpiner } from "../../../components/common/other/LoadingSpiner";


function UpdateDept(){

    const dispatch = useDispatch();
    const deptItems = useSelector(state => state.employeeReducer);    

    useEffect(
        () => {
            dispatch(callDeptAlltAPI());
        },
        []
    )

    return(
        <>
        
            <main className={`main ${GroupCss.main}`}>
                <h1>조직도수정</h1>
                    <div className={`wrapSDept ${UpdateCss.wrapSDept}`}>
                        <div className={`deptList ${UpdateCss.deptList}`}>
                            <table className={`listTable ${UpdateCss.listTable}`}>
                                <thead className={`th ${UpdateCss.th}`}>
                                    <tr>
                                        <th>부서코드</th>
                                        <th>부서명</th>
                                        <th>직원수</th>
                                        <th>수정</th>
                                    </tr>
                                </thead>   
                                <tbody className={`tb ${UpdateCss.tb}`}>
                                    {
                                        deptItems.data.map((item, index) => 
                                        <UpdateList 
                                        key={index}
                                        deptItems={item}
                                        />) 
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            </main>

        </>
    )
}


export default UpdateDept;