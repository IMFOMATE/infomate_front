import * as React from 'react';
// import Default from '../../component/Default.css';
import GroupCss from './Group.module.css';
// import styles from "../../components/approval/ele-component/treeview/nodes/CustomNode.module.css";
// import treeStyle from "./TreeView.module.css"
// import {
//     Tree,
//   } from "@minoru/react-dnd-treeview";




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
                        {/* <div className={treeStyle.doc_wrap}>
                        <Tree
                            tree={treeData}
                            rootId={0}
                            render={(node, { depth, isOpen, onToggle }) => (
                                <CustomNode
                                    node={node}
                                    depth={depth}
                                    isOpen={isOpen}
                                    onToggle={onToggle}
                                />
                            )}
                            initialOpen={true}
                            canDrop={()=> false}
                            classes={{
                                root: styles.treeRoot,
                                draggingSource: styles.draggingSource,
                                dropTarget: styles.dropTarget
                            }}
                        />
                        </div> */}
                </div>
            </main>
            

        
        </>
    )
}


export default Group; 
