import React, {useState} from 'react';
import {
  Tree,
} from "@minoru/react-dnd-treeview";
import styles from '../../components/approval/ele-component/treeview/nodes/CustomNode.module.css';
import treeStyle from '../../components/approval/ele-component/treeview/TreeView.module.css';
import {DeptCustomNode} from '../../components/approval/ele-component/treeview/nodes/DeptCustomNode';
import {LoadingSpiner} from "../../components/common/other/LoadingSpiner";

export default function DeptTreeView({data}) {
  
  console.log("[TreeView] ==== props로 값 전달 잘 되니? :", data);
  const [treeViewData, setTreeData] = useState(data);


    if(!data) return <LoadingSpiner/>;

    return(
      <div className={treeStyle.doc_wrap}>
      <Tree
            tree={data}
          rootId={0}
          render={(node, { depth, isOpen, onToggle }) => (
              <DeptCustomNode
                  node={node}
                  depth={depth}
                  isOpen={isOpen}
                  onToggle={onToggle}
              />
          )}
          initialOpen={false}
          canDrop={()=> false}
          classes={{
            root: styles.treeRoot,
            draggingSource: styles.draggingSource,
            dropTarget: styles.dropTarget
          }}
      />
    </div>
    )

}














