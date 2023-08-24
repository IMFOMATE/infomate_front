import {getBackendOptions, MultiBackend} from "@minoru/react-dnd-treeview";
import {DndProvider} from "react-dnd";
import {theme} from "./themes/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import React from "react";


const DragAndDropWrapper = ({ children }) => {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
          {children}
        </DndProvider>
      </ThemeProvider>
  );
};

export default DragAndDropWrapper;