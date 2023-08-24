import React, { useState, useEffect } from "react";
import styles from "./TreeView.module.css";
import tableStyle from '../table/ApprovalTable.module.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Tree,
} from "@minoru/react-dnd-treeview";
import {SelectCustomNode} from "./nodes/SelectCustomNode";
import {CustomDragPreview} from "./CustomDragPreview";
import Swal from 'sweetalert2';


function ApprovalTreeView({data}) {
  const [selectedNodes, setSelectedNodes] = useState([]);

  useEffect(() => {
    if (selectedNodes.length > 4) {
      Swal.fire(
          'The Internet?',
          'That thing is still around?',
          'question'
      )
      setSelectedNodes([...selectedNodes.slice(0, selectedNodes.length - 1)])
    }
  }, [selectedNodes]);

  const handleSelect = (node) => {
    const item = selectedNodes.find((n) => n.id === node.id);

    if (!item) {
      setSelectedNodes([...selectedNodes, node]);
    } else {
      setSelectedNodes(selectedNodes.filter((n) => n.id !== node.id));
    }
  };

  const clear = ()=>{
    setSelectedNodes([]);
  }

  return (
        <div className={styles.app}>

          <Tree
              tree={data}
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
              classes={{
                draggingSource: styles.draggingSource,
                dropTarget: styles.dropTarget
              }}
          />
          <div className={styles.current}>
            <table className={tableStyle.list_approval}>
              <thead className={tableStyle.list_thead}>
                <tr className={tableStyle.list_tr1}>
                  <td className={tableStyle.list_td2}>이름</td>
                  <td>부서</td>
                  <td>결재 순서</td>
                  <td><RemoveCircleOutlineIcon/></td>
                </tr>
              </thead>
              <tbody>
                {
                  selectedNodes.map((value, index) => <tr key={index} className={`${styles.center} ${tableStyle.list_tr}`}>
                    <td className={tableStyle.list_td2}>{value.text}</td>
                    <td>{value.data.rank}</td>
                    <td>{index+1}</td>
                  </tr>)
                }
              </tbody>
            </table>
            { selectedNodes.length === 0 ? <div className={styles.center}>결재선을 추가해주세요</div> : ''}
          </div>
        </div>
  );
}


export default ApprovalTreeView;