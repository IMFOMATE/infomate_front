import React, {useState} from 'react';
import {
  Tree,
} from "@minoru/react-dnd-treeview";
import {CustomNode} from "./nodes/CustomNode";
import styles from "./nodes/CustomNode.module.css";
import treeStyle from "./TreeView.module.css"


export default function TreeView({data}) {
    const [treeData, setTreeData] = useState(data);

      return (
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
      );
};

