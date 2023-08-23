import React from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { TypeIcon } from "./TypeIcon";
import styles from "./CustomNode.module.css";
import {Link} from "react-router-dom";
import {useModal} from "../../../../context/ModalContext";

export const CustomNode = (props) => {
  const { toggleModal } = useModal('documentKind');
  const { droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

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
              <div onClick={handleToggle}>
                <ArrowRightIcon />
              </div>
          )}
        </div>
        <div>
          <TypeIcon droppable={droppable} fileType={data?.fileType} />
        </div>
        <div className={styles.labelGridItem}>
          {
              data?.fileType === 'doc' ?
                  <Link to={'/approval/document/new'} onClick={toggleModal} state={{name:`${props.node.text}`, type:`${data.fileName}`}} className={styles.labelName}>
                    <Typography variant="body1">{props.node.text}</Typography>
                  </Link>
                  :
                  <Typography variant="body1">{props.node.text}</Typography>
          }
        </div>
      </div>
  );
};