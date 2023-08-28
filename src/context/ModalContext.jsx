import {createContext, useContext, useState} from "react";

// export const ModalContext= createContext();
// export const useModal = () => {
//     return useContext(ModalContext);
// };
//
// export const ModalContextProvider = ({ children }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     console.log(`모달상태 : ${isModalOpen}`)
//     const toggleModal = () => {
//         setIsModalOpen(prev=> !prev);
//     };
//
//     return (
//         <ModalContext.Provider value={{ isModalOpen, toggleModal }}>
//             {children}
//         </ModalContext.Provider>
//     );
// };

const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
    const [modals, setModals] = useState({});

    const toggleModal = (modalId) => {
        setModals((prevModals) => ({
            ...prevModals,
            [modalId]: !prevModals[modalId],
        }));
    };

    const isModalOpen = (modalId) => !!modals[modalId];
    return (
        <ModalContext.Provider value={{ toggleModal, isModalOpen }}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = (modalId) => {
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        throw new Error('useModal must be used within a ModalProvider');
    }

    const { toggleModal, isModalOpen } = modalContext;
    return {
        isModalOpen: isModalOpen(modalId),
        toggleModal: () => toggleModal(modalId),
    };
};