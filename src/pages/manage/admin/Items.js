import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ItemCss from './Items.module.css';
import { updateDeptAPI, callDeptAllAPI } from '../../../apis/DepartmentAPI';
import { GET_DEPTALL } from '../../../modules/DepartmentModule';


function Items () {

    const dispatch = useDispatch();
    const params = useParams();
    // const department = useSelector(state => state.employeeReducer);
    // const deptList = department['employee/GET_DEPTALL'];
    const depart = useSelector(state => state.departmentReducer);

    const [modify, setModify] = useState(false);
    const [form, setForm] = useState();

    // 정보조회

    useEffect(          // 조직도 불러오기
        () => {
            console.log("[updateDept] params.deptName : " , params.deptCode);
            
            dispatch(callDeptAllAPI({
                deptCode: params.deptCode
            }))
        },
        []
    )
    console.log("Items ===> depart : " , depart);
    console.log("Items ===> deptList : " );

    // 수정 버튼 구현 

    // 활성화시킴과 동시에 데이터 넣겟다.
    // const onclickModifyModeHandler = () => {
    //     setModify(true);
    //     setForm({
    //     deptName: department.deptName
    //     })
    // }
    
    const onclickModifyModeHandler = (id) => {
        
        
        setModify(true);
        setForm({
            deptName: depart.deptName
        })

    }
    
    


    // fom 데이터 세팅하기
    const onChangeHandler = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    ////// 수정내용 보내기
    const onClickDeptUpdateHandler = () => {
        console.log("[Items] onClickDeptUpdateHandler ==> ", onClickDeptUpdateHandler);

        const formData = new FormData();
        formData.append("deptName", form.deptName);
        console.log("form deptName", form.deptName);

        dispatch(updateDeptAPI({
            form:formData
        }));

        console.log("[onClickDeptUpdateHandler] formData : ", formData);
    }



    // 삭제 버튼 구현
    



    return(
        <>
            {/* <div className={`titleWrap ${ItemCss.titleWrap}`}>
                <span className={`titleDeptCode ${ItemCss.titleDeptCode}`}>부서코드</span>
                <span className={`titleDeptName ${ItemCss.titleDeptName}`}>부서명</span>
            </div> */}
            {
                depart && depart.map((d) =>
                    // <div
                    // className={`deptWrap ${ItemCss.deptWrap}`} 
                    // key={d.deptCode}
                    // >
                        <p className={`deptP ${ItemCss.deptP}`} key={d.deptCode}>
                            <label
                            className={`deptCode ${ItemCss.deptCode}`}
                            // placeholder={d.deptCode}
                            readOnly
                            // disabled="false"
                            // htmlFor={d.deptCode}
                            >{d.deptCode}</label>
                            <input
                            className={`deptNameInput ${ItemCss.deptNameInput}`}
                            name='deptName'
                            value={ (!modify ? d.deptName : form.deptName) || '' }
                            onChange={ onChangeHandler }
                            readOnly={ modify ? false : true }
                            htmlFor={d.deptCode}
                            style={ !modify ? { outline : "none" } : null }
                            />
                            {!modify &&
                                <button
                                className={`material-symbols-outlined icon ${ItemCss.updateBnt}`}
                                onClick={() => onclickModifyModeHandler(d.deptCode)}
                                id={d.deptCode}
                                >edit</button>
                            }
                            {modify &&
                                <button 
                                className={`material-symbols-outlined icon ${ItemCss.deletBnt}`}
                                onClick={() => onClickDeptUpdateHandler(d.deptCode)}
                                >
                                check
                                </button>
                            }
                            
                            <button
                            className={`material-symbols-outlined icon ${ItemCss.deletBnt}`}
                            >delete</button>
                        </p>
                    // </div>
                )
            }
        </>
    )
}

export default Items;