import React, { useEffect, useState} from 'react';
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
    const [form, setForm] = useState({});

    // 로컬로 복사 
    const [items, setItems] = useState(depart);


    // 로컬상태 업데이트 시키기
    useEffect(() => {
        setItems(depart);
    }, [depart]);

    const toggleEditState = (itemDeptCode) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.deptCode === itemDeptCode ? { ...item, isEditing: !item.isEditing } : item
          )
        );

        setForm(items.filter(item=>item.deptCode === itemDeptCode)[0])
      };  

      console.log(form);



    // 정보조회

    useEffect(          // 조직도 불러오기
        () => {
            console.log("[listDepartment] params.deptName : " , params.deptCode);
            
            dispatch(callDeptAllAPI({
                deptCode: params.deptCode
            }))
        },
        []
    )
    console.log("Items ===> depart : " , items);
    console.log("Items ===> deptList : ");

    // 수정 버튼 구현 

    // 활성화시킴과 동시에 데이터 넣겟다.
    // const onclickModifyModeHandler = () => {
    //     setModify(true);
    //     setForm({
    //     deptName: items.deptName,
    //     deptCode: items.deptCode
        
    //     })
    // }
    
    // const onclickModifyModeHandler = (name) => {
        
        
    //     setModify(true);
    //     setForm({
    //         deptName: depart.deptName
    //     })

    // }
    
    

    
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

        // const formData = new FormData();
        // formData.append("deptName", form.deptName);
        // formData.append("deptCode", form.deptCode);
        // console.log("form deptName", form.deptName);

        dispatch(updateDeptAPI({
            form: form
        }));

        console.log(form);
        // console.log("[onClickDeptUpdateHandler] formData : ", formData);
    }



    // 삭제 버튼 구현
    



    return(
        <>

            {
                items.length > 0 && items.map((item) =>


                        <div className={`deptP ${ItemCss.deptP}`} key={item.deptCode}>
                            <input
                            placeholder={item.deptCode}
                            className={`inputCode ${ItemCss.inputCode}`}
                            disabled={false}
                            />
                            {
                                item.isEditing? (
                                    <input 
                                    className={`inputDept ${ItemCss.inputDept}`}
                                    onClick={() => toggleEditState(item.deptCode)}
                                    type='text'
                                    // value={item.deptName}
                                    onChange={ onChangeHandler }
                                    // readOnly={ !item.isEditing ? false : true }
                                    name='deptName'
                                    />
                                ) : (
                                    <input
                                    className={`inputDept ${ItemCss.inputDept}`}
                                    onClick={() => toggleEditState(item.deptCode)}
                                    value={item.deptName}
                                    onChange={ onChangeHandler }
                                    />
                                )}
                                {
                                    !item.isEditing ? (
                                        <button
                                        onClick={() => toggleEditState(item.deptCode)}
                                        className={`material-symbols-outlined icon ${ItemCss.updateBnt}`}
                                        >
                                            edit
                                        </button>
                                    ) : (
                                        <button
                                        onClick={onClickDeptUpdateHandler}
                                        className={`material-symbols-outlined icon ${ItemCss.updateBnt}`}
                                        >
                                            check
                                        </button>
                                    )
                                }
                                    {/* <button
                                    onClick={() => toggleEditState(item.deptCode)}
                                    >
                                    { item.isEditing ? 'save' : 'Edit'}
                                    </button> */}
                        </div>
                )
            }
        </>
    )
}

export default Items;