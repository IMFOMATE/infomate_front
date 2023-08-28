import React, {useState} from 'react';
import {
  Tree,
} from "@minoru/react-dnd-treeview";
import {CustomNode} from "./nodes/CustomNode";
import styles from "./nodes/CustomNode.module.css";
import treeStyle from "./TreeView.module.css"

// const documentKind = [
//   {
//     "id": 1,
//     "parent": 0,
//     "droppable": true,
//     "text": "일반"
//   },
//   {
//     "id": 2,
//     "parent": 1,
//     "droppable": false,
//     "text": "업무기안",
//     "data": {
//       "fileType": "doc",
//       "fileName": 'draft'
//     }
//   },
//   {
//     "id": 3,
//     "parent": 1,
//     "droppable": false,
//     "text": "업무협조",
//     "data": {
//       "fileType": "doc",
//       "fileName": 'draft'
//     }
//   },
//   {
//     "id": 4,
//     "parent": 0,
//     "droppable": true,
//     "text": "지출"
//   },
//   {
//     "id": 5,
//     "parent": 4,
//     "droppable": false,
//     "text": "지출결의서",
//     "data": {
//       "fileType": "doc",
//       "fileName": 'payment'
//     }
//   },
//   {
//     "id": 6,
//     "parent": 0,
//     "droppable": true,
//     "text": "휴가",
//   },
//   {
//     "id": 7,
//     "parent": 6,
//     "droppable": false,
//     "text": "휴가신청서",
//     "data": {
//       "fileType": "doc",
//       "fileName": 'vacation'
//     }
//   },
// ];


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

