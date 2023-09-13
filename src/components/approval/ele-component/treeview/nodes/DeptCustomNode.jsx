import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { TypeIcon } from "../TypeIcon";
import styles from "./CustomNode.module.css";
import { useNavigate } from "react-router-dom";
import GroupCss from '../../../../../pages/manage/Group.module.css';


export const DeptCustomNode = (props) => {
  const { droppable, data } = props.node;
  const indent = props.depth * 24;
  const navigate = useNavigate();

  const deptData = props.data;

  const [modal, setModal] = useState(false);

  console.log("[DeptCustomNode] data 값 확인", deptData);
  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const onClickSimpleInfoHandler = (memberCode) => {
    navigate(`searchDept/memberInfo/${memberCode}`)

  }

  

  return (
      <div
          className={`tree-node ${styles.root}`}
          style={{ paddingInlineStart: indent }}
      >
        <div
            className={`${styles.expandIconWrapper} ${
                props.isOpen ? styles.isOpen : ""
            }`}
        >
          {props.node.droppable && (
              <div onClick={handleToggle} className={`material-symbols-outlined icon ${GroupCss.dropBnt}`}>
                {/* <ArrowRightIcon /> */}
                Remove
              </div>
          )}
        </div>
        <div>
          {/* <TypeIcon droppable={droppable} fileType={data?.fileType} /> */}
        </div>
        <div className={styles.labelGridItem}>
          
          {
             data?.fileType !== 'person' ? 
             <div>
              <Typography variant="body1 ">{props.node.text}</Typography> 
             </div>
             :
             <div onClick={ () => onClickSimpleInfoHandler(data?.memberCode)}>
              <Typography 
              variant="body1 "
              >{props.node.text}</Typography> 
             </div>
          }
          
        </div>
      </div>
  );
};