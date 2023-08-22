import React, {useState} from 'react';
import styles from './TreeView.module.css'
import { DndProvider } from "react-dnd";
import {
    Tree,
    MultiBackend,
    getBackendOptions
} from "@minoru/react-dnd-treeview";

const data = [
    {
        "id": 1,
        "parent": 0,
        "droppable": true,
        "text": "Folder 1"
    },
    {
        "id": 2,
        "parent": 1,
        "text": "File 1-1"
    },
    {
        "id": 3,
        "parent": 1,
        "text": "File 1-2"
    },
    {
        "id": 4,
        "parent": 0,
        "droppable": true,
        "text": "Folder 2"
    },
    {
        "id": 5,
        "parent": 4,
        "droppable": true,
        "text": "Folder 2-1"
    },
    {
        "id": 6,
        "parent": 5,
        "text": "File 2-1-1"
    }
];


const TreeView = () => {
    const [treeData, setTreeData] = useState(data);
    const handleDrop = (newTree) => setTreeData(newTree);

    return (
        <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <Tree
                tree={treeData}
                rootId={0}
                onDrop={handleDrop}
                render={(node, { depth, isOpen, onToggle }) => (
                    <div style={{ marginLeft: depth * 10 }}>
                        {node.droppable && (
                            <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
                        )}
                        {node.text}
                    </div>
                )}
            />
        </DndProvider>
    );
};

export default TreeView;