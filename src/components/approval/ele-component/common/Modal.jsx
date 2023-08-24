import styles from './Modal.module.css';
import {useModal} from "../../../../context/ModalContext";
import ButtonOutline from "../../../common/button/ButtonOutline";
import TreeView from "../treeview/TreeView";
import DocumentKindModal from "../modal/DocumentKindModal";

//전역용
function Modal({ modalId, title }) {
    const { isModalOpen, toggleModal } = useModal(modalId); // 모달 별 상태가져오기

    // 각 모달에 따른 내용을 조건부로 렌더링
    const renderModalContent = () => {
        if (modalId === 'documentKind') {
            return (
                <DocumentKindModal data={documentKind} state={isModalOpen} toggleModal={toggleModal} />
            );
        } else if (modalId === 'approval') {
            return (
                <div>
                    {/* 모달 2의 내용 */}
                </div>
            );
        }
        // 모달 추가시 조건을 주자
    };

    return renderModalContent();
}

export default Modal;

const documentKind = [
    {
        "id": 1,
        "parent": 0,
        "droppable": true,
        "text": "일반"
    },
    {
        "id": 2,
        "parent": 1,
        "droppable": false,
        "text": "업무기안",
        "data": {
            "fileType": "doc",
            "fileName": 'draft'
        }
    },
    {
        "id": 3,
        "parent": 1,
        "droppable": false,
        "text": "업무협조",
        "data": {
            "fileType": "doc",
            "fileName": 'draft'
        }
    },
    {
        "id": 4,
        "parent": 0,
        "droppable": true,
        "text": "지출"
    },
    {
        "id": 5,
        "parent": 4,
        "droppable": false,
        "text": "지출결의서",
        "data": {
            "fileType": "doc",
            "fileName": 'payment'
        }
    },
    {
        "id": 6,
        "parent": 0,
        "droppable": true,
        "text": "휴가",
    },
    {
        "id": 7,
        "parent": 6,
        "droppable": false,
        "text": "휴가신청서",
        "data": {
            "fileType": "doc",
            "fileName": 'vacation'
        }
    },
];
