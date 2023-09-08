import React from 'react';
import style from './MailContactModal.module.css';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {callSelectAPI} from '../../../../apis/ContactAPIcalls'

function MailContactModal({ isOpen, closeModal, contact , setReceiver, receiver}) {

    
    const dispatch = useDispatch();



    const handleOutsideClick = (event) => {
        if (event.target.id === 'addressModal') {
            closeModal();
        }
    };

    

    const handleSelectChange =  (e) => {

        const selectedValue = e.target.value; 
        const selectedContact = contact.find(contact => contact.contactName === selectedValue);
        console.log('selected', selectedContact);
                

        setReceiver(prevContacts => [...prevContacts, selectedContact]); 

    };

    const onDeleteContact = (contact) => {

        console.log('ㅎㅇㅎㅇ?',contact);

       const updateSelected = receiver.filter(item => item.contactName != contact.contactName);

       setReceiver(updateSelected);
        
        
    }

    const onReceiver = () => {
        closeModal();
        
    }

    

    return (
        <>
        
            {isOpen && (
                <div className={style.modalOverlay} onClick={handleOutsideClick} id="addressModal">

                    

                        <div className={style.modal}>
                            <div>
                            <div className={style.title}>연락처</div>
                            <select name="contact" className={style.contactBox} onChange={handleSelectChange}>
                            <option value="" disabled>선택해주세요</option>
                            {
                            contact.map((value, index) => 
                                <option value={value.contactName}>{value.contactName}  - <span>{value.contactEmail}</span></option>
                            )
                            }
                            </select>
                            </div>
                            <div className={style.addContact}>
                            
                            {receiver.map((contact, index) => (
                                <div key={index}>{contact.contactName} - {contact.contactEmail} 
                                
                                <button onClick={ () => onDeleteContact(contact)}>&nbsp;&nbsp; X</button></div>
                            ))}
                            
                            </div>
                            <div className={style.sendButtonContainer}>
                            <button className={style.sendButton} onClick={ onReceiver } >확인</button>
                            </div>

                        </div>




                </div>
            )}

        
        </>
    );
}

export default MailContactModal;