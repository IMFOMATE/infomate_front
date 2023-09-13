import React from 'react';
import style from './MailContactModal.module.css';
import {useSelector, useDispatch} from 'react-redux';

import {callSelectAPI} from '../../../../apis/ContactAPIcalls'

function MailContactModal({
                              isOpen,
                              closeModal,
                              contact,
                              setReceiver,
                              receiver,
                              memberList,
                              setCompany,
                              company,
                              onChangeNameHandler
                          }) {


    const dispatch = useDispatch();


    console.log('"기뭐링', memberList);


    const handleOutsideClick = (event) => {
        if (event.target.id === 'addressModal') {
            closeModal();
        }
    };


    const handleSelectChange = (e) => {

        const selectedValue = e.target.value;
        const selectedContact = contact.find(contact => contact.contactName === selectedValue);
        console.log('selected', selectedContact);


        setReceiver(prevContacts => [...prevContacts, selectedContact]);
    };

    const handleSelectCompanyChange = (e) => {

        const selectedValue = e.target.value;
        const selectedContact = memberList.find(member => member.memberName === selectedValue);
        console.log('selected', selectedContact.memberName);


        setCompany(prevContacts => [...prevContacts, selectedContact])
    }

    const onDeleteContact = (contact) => {

        console.log('ㅎㅇㅎㅇ?', receiver);

        const updateSelected = receiver.filter(item => item.contactName != contact.contactName);

        setReceiver(updateSelected);


    }

    const onDeleteMember = (member) => {

        console.log('receiver', receiver);


        const updateSelected = company.filter(item => item.memberName != member.memberName);

        setCompany(updateSelected)
    }

    const onReceiver = () => {
        closeModal();
        onChangeNameHandler();
    }


    return (
        <>

            {isOpen && (
                <div className={style.modalOverlay} onClick={handleOutsideClick} id="addressModal">


                    <div className={style.modal}>
                        <div>
                            <div className={style.title}>연락처</div>
                            <select name="contact" className={style.contactBox} onChange={handleSelectChange}>
                                <option value="" disabled placeholder='연락처'>연락처</option>
                                {
                                    contact?.map((value, index) =>
                                        <option
                                            value={value.contactName}>{value.contactName} - <span>{value.contactEmail}</span>
                                        </option>
                                    )
                                }

                            </select>
                            <div className={style.title}>회사</div>
                            <select name="contact" className={style.contactBox} onChange={handleSelectCompanyChange}>
                                <option value="" disabled placeholder='연락처'>연락처</option>
                                {
                                    memberList?.map((value, index) =>
                                        <option
                                            value={value.memberName}>{value.memberName} - <span>{value.memberEmail}</span>
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <div className={style.addContact}>

                            {receiver.map((contact, index) => (
                                <div key={index}>{contact.contactName} - {contact.contactEmail}

                                    <button onClick={() => onDeleteContact(contact)}>&nbsp;&nbsp; X</button>
                                </div>
                            ))}

                            {company.map((member, index) => (
                                <div key={index}>{member.memberName} - {member.memberEmail}

                                    <button onClick={() => onDeleteMember(member)}>&nbsp;&nbsp; X</button>
                                </div>
                            ))}
                            
                            
                            
                            </div>
                            <div></div>
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