import {React} from 'react';
import GroupCss from '../Group.module.css';
import UpdateCss from'./UpdateList.module.css';
// import UpdateList from './UpdateList';
// import 
// { callDeptAllAPI } from '../../../apis/EmployeeAPI';
// import { useDispatch, useSelector } from "react-redux";
import DeptItems from './DeptItems';
// import { useParams } from 'react-router';
// import { LoadingSpiner } from "../../../components/common/other/LoadingSpiner";


function UpdateDept(){

    

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
                                        <DeptItems />
                            </table>
                        </div>
                    </div>
            </main>

        </>
    )
}


export default UpdateDept;