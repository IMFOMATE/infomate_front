import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
export const TypeIcon = (props) => {
  if (props.droppable) {
    return <FolderIcon sx={{ color: 'var(--color-hard)'}} />;
  }

  switch (props.fileType) {
    case "doc":
      return <DescriptionOutlinedIcon sx={{ color: 'var(--color-text-content)'}} />;
    case "csv":
      return <ListAltIcon />;
    case "text":
      return <DescriptionIcon />;
    default:
      return null;
  }
};
