import * as React from 'react';
import { useEffect } from 'react';
import GroupCss from './Group.module.css';
import DeptTreeView from './TreeView';
import { useSelector, useDispatch } from 'react-redux';
import { treeviewAPI } from '../../apis/DepartmentAPI';


function Group () {

    const dispatch = useDispatch();

    const data = useSelector(state => state.departmentReducer);
    
    useEffect(
        () => {
            dispatch(treeviewAPI({}))
        },
        []
    );
    console.log("[Group] treeView 값 들어오니???????? ", data);
    return(

        <>
            <main className={`main ${GroupCss.main}`}>
                <h1>조직도</h1>
                <div className={`firstWrap ${GroupCss.firstWrap}`}>
                    <div className={`deptList ${GroupCss.deptList}`}>
                        <div className={`list ${GroupCss.list}`}>
                            <DeptTreeView node={data}/>
                        </div>
                    </div>

                </div>
            </main>
            

        
        </>
    )
}


export default Group; 



