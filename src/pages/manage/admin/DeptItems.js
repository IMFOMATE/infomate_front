import  { React, useEffect, useState  } from "react";
import UpdateCss from './UpdateList.module.css';
import { useDispatch, useSelector } from "react-redux";
import {
    callDeptAllAPI
} from '../../../apis/EmployeeAPI';
import { useParams } from "react-router-dom";
// import { LoadingSpiner } from "../../../components/common/other/LoadingSpiner";
// import StylesLoading from '../../calendar/loadingStyle.module.css';
// import { FadeLoader } from "react-spinners";



function DeptItems(){      
    


    const dispatch = useDispatch();             // 보내보내
    const params = useParams();
    const dept = useSelector(state => state.employeeReducer);   
    
    // const [modifyMode, setModifyMode] = useState(false);    // 활성화 
    // const [form, setForm] = useState({});                   // 입력값 셋
    
    console.log("[DeptItems] dept", dept);

    useEffect(
        () => {
            console.log("[DeptItems] params.deptCode : ", params.deptCode);

            dispatch(callDeptAllAPI({
                deptCode: params.deptCode
            }));
        },
        []
    )


    ////// 수정버튼에 줄 핸들러
    // const onClickUpdateItem = () => {       
    //     setModifyMode(true);
    //     setForm({
    //         deptName: dept.deptName
    //     })
    // }

    ////// form 세팅
    // const onChangeHandler = (e) => {            
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // // 수정하기 버튼 누르면 입력폼 활성화 
    // const onClickModifyModeHandler = () => {

    //     setModifyMode(true);
    //     setForm({deptName : dept.deptName})
    // }   


    // // 수정 완료 버튼 시 업데이트할 것
    // const onClickDeptUpdateHandler = () => {
    //     console.log("[DeptItems] onClickDeptUpdateHandler");

    //     const formData = new FormData();
    //     formData.append("deptName", form.deptName);

    //     dispatch(callDeptAllAPI({
    //         form: formData
    //     }))
    // }
    // if(dept.length === 0) return <div className={StylesLoading.loading}><FadeLoader color="#9F8AFB" /></div>

    // if(!dept) return <LoadingSpiner />
    console.log("[DeptItems] dept------->>", dept);


    return(
        <>
            {
                dept && dept.data.map(
                    (d, index) =>
                    <tbody className={`tb ${UpdateCss.tb}`} key={d.deptCode}>
                    <tr>
                        <td><label type="text"> {d.deptCode} </label></td>
                        <td><input 
                            name='deptName' 
                            placeholder={d.deptName}
                            
                            /></td>
                        <td><button>삭제하기</button></td>
                        <td><button >수정하기</button></td>
                    </tr>
                    </tbody>
                )
            }
        </>
    )
}



export default DeptItems;