import React, {useState} from 'react';
import {
  Tree,
} from "@minoru/react-dnd-treeview";
import styles from '../../components/approval/ele-component/treeview/nodes/CustomNode.module.css';
import treeStyle from '../../components/approval/ele-component/treeview/TreeView.module.css';
import {CustomNode} from '../../components/approval/ele-component/treeview/nodes/CustomNode';

export default function DeptTreeView({data}) {

  const [treeData, setTreeData] = useState(data);

  console.log("[TreeView] Group에서 넘겨준 값 잘 들어와?? ===>>>>", treeData);

    return(
      <div className={treeStyle.doc_wrap}>
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
    </div>
    )

}














