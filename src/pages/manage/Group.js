import * as React from 'react';
// import Default from '../../component/Default.css';
import GroupCss from './Group.module.css';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
// import { withStyles } from '@mui/material';


// const MyTreeItem = withStyles({
//     root: {
//         "&.MuiTreeItem-root > .MuiTreeItem-content:hover": {
//             background: "blue",
//         }
//     }
// })(TreeItem);



function Group () {


    return(

        <>
            <main className={`main ${GroupCss.main}`}>
                <h1>조직도</h1>
                <div className={`firstWrap ${GroupCss.firstWrap}`}>
                    <div className={`deptList ${GroupCss.deptList}`}>
                        <div className={`list ${GroupCss.list}`}>
                            <TreeView
                                aria-label="file system navigator"
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                                sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                                >
                                <TreeItem nodeId="1" label="인사관리 부서">
                                    <TreeItem nodeId="2" label="팀장 홍길동" />
                                    <TreeItem nodeId="2" label="과장 김과장" />
                                    <TreeItem nodeId="2" label="대리 이대리" />
                                </TreeItem>
                                <TreeItem nodeId="2" label="인사관리 부서">
                                    <TreeItem nodeId="2" label="팀장 홍길동" />
                                    <TreeItem nodeId="2" label="과장 김과장" />
                                    <TreeItem nodeId="2" label="대리 이대리" />
                                </TreeItem>
                            </TreeView>
                        </div>
                    </div>
                    <div className={`deptInfo ${GroupCss.deptInfo}`}>
                        <div className={`infoBox ${GroupCss.infoBox}`}>
                            <div className={`infoIcon ${GroupCss.infoIcon}`}>
                                <a href='/'>
                                    <span className='material-symbols-outlined'>
                                        close
                                    </span>
                                </a>
                            </div>
                            <div className={`empInfo ${GroupCss.empInfo}`}>
                                <img className={`empImage ${GroupCss.empImage}`} alt='empImage' src='img/user.jpg'/>                               
                            </div>
                            <div className={`empSign ${GroupCss.empSign}`}>
                                <p>이름 : 홍길동</p>
                                <p>직급 : 과장</p>
                                <p>부서 : 인사관리 부서 3팀</p>
                                <p>이메일 : hong123@gamil.com</p>
                                <p>내선번호 : 02-2266-1234</p>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
            

        
        </>
    )
}


export default Group; 
