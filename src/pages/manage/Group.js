import * as React from 'react';
// import Default from '../../component/Default.css';
import GroupCss from './Group.module.css';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import MemberInfo from './MemberInfo';
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
                            
                        </div>
                    </div>
                    {/* <MemberInfo/> */}
                </div>
            </main>
            

        
        </>
    )
}


export default Group; 
