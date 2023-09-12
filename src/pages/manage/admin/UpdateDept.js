import {React, useState} from 'react';
import GroupCss from '../Group.module.css';
import UpdateCss from'./UpdateList.module.css';
// import UpdateList from './UpdateList';
// import 
// { callDeptAllAPI } from '../../../apis/EmployeeAPI';
// import { useDispatch, useSelector } from "react-redux";
// import DeptItems from './DeptItems';
// import { useParams } from 'react-router';
// import { LoadingSpiner } from "../../../components/common/other/LoadingSpiner";
import Items from './Items';
import ItemCss from './Items.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { insertDeptAPI } from '../../../apis/DepartmentAPI';
import { POST_DEPT_INSERT } from '../../../modules/DepartmentModule';

function UpdateDept(){

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        deptName: ''
    })


    // form 데이터 세팅
    const onChangingHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onClickdepartmentInsertHandler = () => {
        console.log("[insertHandler] =======> onClickdepartmentInsertHandler ");

        const formData = new FormData();

        formData.append("deptName", form.deptName);

        dispatch(insertDeptAPI({
            form: formData
        }));

        // alert('부서 등록 완료되었습니다.');
        // navigate('/updateDept', {replace: true});
        // window.location.reload();
    }
    

    return(
        <>
        
            <main className={`main ${GroupCss.main}`}>
                <h1>조직도수정</h1>
                    <div className={`wrapSDept ${UpdateCss.wrapSDept}`}>
                    <div className={`titleWrap ${ItemCss.titleWrap}`}>
                        <span className={`titleDeptCode ${ItemCss.titleDeptCode}`}>부서코드</span>
                        <span className={`titleDeptName ${ItemCss.titleDeptName}`}>부서명</span>
                    </div>
                        <div>
                            <input
                            placeholder='추가할 부서를 입력하세요.'
                            name='deptName'
                            onChange={ onChangingHandler }
                            />
                            <button
                            className={`material-symbols-outlined icon ${ItemCss.deletBnt}`}
                            onClick={ onClickdepartmentInsertHandler }
                            >
                                check
                            </button>
                        </div>
                        <Items />
                    </div>
            </main>
        </>
    )
}


export default UpdateDept;