import React, { useState } from "react";
import styles from "./TreeView.module.css"


import {
  Tree,
} from "@minoru/react-dnd-treeview";
import {SelectCustomNode} from "./nodes/SelectCustomNode";
import {CustomDragPreview} from "./CustomDragPreview";


const SampleData = [
  {
    "id": 1,
    "parent": 0,
    "droppable": true,
    "text": "Folder 1"
  },
  {
    "id": 2,
    "parent": 1,
    "droppable": false,
    "text": "File 1-1",
    "data": {
      "fileType": "csv",
      "fileSize": "0.5MB"
    }
  },
  {
    "id": 3,
    "parent": 1,
    "droppable": false,
    "text": "File 1-2",
    "data": {
      "fileType": "text",
      "fileSize": "4.8MB"
    }
  },
  {
    "id": 4,
    "parent": 0,
    "droppable": true,
    "text": "Folder 2"
  },
  {
    "id": 5,
    "parent": 0,
    "droppable": true,
    "text": "Folder 2-1"
  },
  {
    "id": 6,
    "parent": 5,
    "droppable": false,
    "text": "File 2-1-1",
    "data": {
      "fileType": "image",
      "fileSize": "2.1MB"
    }
  },
  {
    "id": 7,
    "parent": 5,
    "droppable": false,
    "text": "File 2-1-1",
    "data": {
      "fileType": "image",
      "fileSize": "2.1MB"
    }
  },
  {
    "id": 8,
    "parent": 5,
    "droppable": false,
    "text": "File 2-1-1",
    "data": {
      "fileType": "image",
      "fileSize": "2.1MB"
    }
  },
  {
    "id": 9,
    "parent": 5,
    "droppable": false,
    "text": "File 2-1-1",
    "data": {
      "fileType": "image",
      "fileSize": "2.1MB"
    }
  }
  ,
  {
    "id": 10,
    "parent": 5,
    "droppable": false,
    "text": "File 2-1-1",
    "data": {
      "fileType": "image",
      "fileSize": "2.1MB"
    }
  }
];

function ApprovalTreeView() {
  const [treeData, setTreeData] = useState(SampleData);
  const handleDrop = (newTree) => setTreeData(newTree);
  const [selectedNodes, setSelectedNodes] = useState([]);

  const handleSelect = (node) => {
    const item = selectedNodes.find((n) => n.id === node.id);

    if (!item) {
      setSelectedNodes([...selectedNodes, node]);
    } else {
      setSelectedNodes(selectedNodes.filter((n) => n.id !== node.id));
    }
  };

  return (
        <div className={styles.app}>

          <Tree
              tree={treeData}
              rootId={0}
              render={(node, { depth, isOpen, onToggle }) => (
                  <SelectCustomNode
                      node={node}
                      depth={depth}
                      isOpen={isOpen}
                      isSelected={!!selectedNodes.find((n) => n.id === node.id)}
                      canDrop={()=> false}
                      onToggle={onToggle}
                      onSelect={handleSelect}
                  />
              )}
              dragPreviewRender={(monitorProps) => (
                  <CustomDragPreview monitorProps={monitorProps} />
              )}
              onDrop={handleDrop}
              classes={{
                draggingSource: styles.draggingSource,
                dropTarget: styles.dropTarget
              }}
          />
          <div className={styles.current}>
            <p>
              <span className={styles.currentLabel}>
                {selectedNodes.length === 0
                    ? "결재자를 선택해주세요"
                    : selectedNodes.map((n) => n.text).join(", ")}
              </span>
            </p>
          </div>
        </div>
  );
}


export default ApprovalTreeView;