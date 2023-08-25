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
import {useDraftDataContext} from "../../../../context/approval/DraftDataContext";


function RefTreeView({modalData}) {

  const {data, setData} = useDraftDataContext();

  const { refList } = data;



  const handleSelect = (node) => {
    const item = refList.find((n) => n.id === node.id);

    if (!item) {
      setData(prev => ({...prev, refList:([...prev.refList, node])}))
    } else {
      setData(prev=> ({...prev, refList:refList.filter((n) => n.id !== node.id)}))
    }
  };


  return (
        <div className={styles.app}>

          <Tree
              tree={modalData}
              rootId={0}
              render={(node, { depth, isOpen, onToggle }) => (
                  <SelectCustomNode
                      node={node}
                      depth={depth}
                      isOpen={isOpen}
                      isSelected={!!refList.find((n) => n.id === node.id)}
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
                    (refList.length !== 0) &&
                    refList.map((value, index) => <tr key={index} className={`${styles.center} ${tableStyle.list_tr}`}>
                    <td className={tableStyle.list_td2}>{value.text}</td>
                    <td>{value.data.rank}</td>
                    <td>{index+1}</td>
                  </tr>
                  )
                }
              </tbody>
            </table>
            { refList.length === 0 ? <div className={styles.center}>참조자를 추가해주세요</div> : ''}
          </div>
        </div>
  );
}


export default RefTreeView;