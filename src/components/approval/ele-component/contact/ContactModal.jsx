import style from '../../../../pages/addressBook/AddressBook.module.css';
import { useEffect, useState, useRef } from "react";

function ContactModal (contact) {

    const [selectedContact, setSelectedContact] = useState(null);

    const closeModal = () => {
        setSelectedContact(null);
    };


    return (
        <>
                {contact && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <button className={style.closeModalButton} onClick={closeModal}>
                        &times;
                        </button>
                        <div className={style.contentTitle}>
                        <h2>{contact.contactName} 연락처 정보</h2>
                        </div>
                        <div className={style.contentModal}>
                        <input type="text" value={ contact }><img src={contact.contactPhoto} alt="프로필 사진" /></input>
                        <input type="text" value={ contact }></input>
                        <input type="text" value={ contact }></input>
                        <input type="text" value={ contact }></input>
                        <input type="text" value={ contact }></input>
                        <input type="text" value={ contact }></input>
                        <input type="text" value={ contact }></input>
                        <input type="text" value={ contact }></input>
                        <input type="text" value={ contact }> </input>
                        </div>
                    <div className={style.contentButton}>
                    <button>수정완료</button>
                   
                    </div>
                        
                    </div>
                </div>
      )}
        
        </>    
    )
}


export default ContactModal;


