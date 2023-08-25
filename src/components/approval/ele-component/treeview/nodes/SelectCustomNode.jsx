import styles from "./CustomNode.module.css";
import { TypeIcon } from "../TypeIcon";
import React from "react";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Checkbox from "@mui/material/Checkbox";

export const SelectCustomNode = (props) => {
  const { droppable, data } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const handleSelect = () => props.onSelect(props.node);

  return (
      <div
          className={`tree-node ${styles.root} ${
              props.isSelected ? styles.isSelected : ""
          }`}
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
        {
          data?.fileType === 'person' ?
              <div>
                <Checkbox
                    color="primary"
                    size="small"
                    checked={props.isSelected}
                    onClick={handleSelect}
                />
              </div>
              :
              ''
        }
        <div>
          <TypeIcon droppable={droppable} fileType={data?.fileType} />
        </div>
        <div className={styles.labelGridItem}>
          <Typography variant="body2">{`${props.node.text} ${ props.node.data !== null ? props.node.data.rank : '' }`}</Typography>
        </div>
      </div>
  );
};