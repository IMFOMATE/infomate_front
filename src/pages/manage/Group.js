import React, {useState} from 'react';
import { useEffect } from 'react';
import GroupCss from './Group.module.css';
import DeptTreeView from './DeptTreeView';
import { useSelector, useDispatch } from 'react-redux';
import { treeviewAPI } from '../../apis/DepartmentAPI';
import {GET_TREEVIEW} from "../../modules/DepartmentModule";
import SimpleInfo from './SimpleInfo';


function Group () {

    const dispatch = useDispatch();

    const dataTree = useSelector(state => state.departmentReducer[GET_TREEVIEW]);

    // 정보 창 띄우기
    const [modal, setModal] = useState(false);

    // const treeData = data.data;
    const dataTree = useSelector(state => state.departmentReducer[GET_TREEVIEW]);

    // 정보 창 띄우기
    const [modal, setModal] = useState(false);

    // const treeData = data.data;
    useEffect(
        () => {
            dispatch(treeviewAPI({}))
        },
        []
    );
    console.log("[Group] treeView 값 들어오니???????? ", dataTree);
    console.log("[Group] treeView 값 들어오니???????? ", dataTree);
    return(

        <>
            <main className={`main ${GroupCss.main}`}>
                <h1>조직도</h1>
                <div className={`firstWrap ${GroupCss.firstWrap}`}>
                    <div className={`deptList ${GroupCss.deptList}`}>
                        <div className={`list ${GroupCss.list}`}>
                            {/* {Array.isArray({dataTree}) && dataTree.length > 0 ?(
                                <DeptTreeView data={dataTree}/>
                            ):(<p>no</p>)
                            
                            } */}

                            {/* <button onClick={()=> {setModal(!modal)}}>클릭</button> */}

                                <DeptTreeView data={dataTree?.data}/>
                        </div>
                        {
                            modal === true ?    (
                            <div className={`simpleInfoWrap ${GroupCss.simpleInfoWrap}`}>
                            <SimpleInfo />
                            <button className={`xbnt ${GroupCss.xbnt}`} 
                            onClick={() => {setModal(!modal)} }
                            >닫기</button>
                            </div>) : null
                        }
                        
                    </div>

                </div>
            </main>
            

        
        </>
    )
}


export default Group; 


