import {createContext, useContext, useState} from "react";

export const ModalContext= createContext();
export const useModal = () => {
    return useContext(ModalContext);
};

export const ModalContextProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(`모달상태 : ${isModalOpen}`)
    const toggleModal = () => {
        setIsModalOpen(prev=> !prev);
    };

    return (
        <ModalContext.Provider value={{ isModalOpen, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};