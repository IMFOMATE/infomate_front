import { useNavigate } from 'react-router';
import { callContactUpdateAPI } from '../../../../apis/ContactAPIcalls';
import style from '../../../../pages/addressBook/AddressBook.module.css';
import { useEffect, useState, useRef,  } from "react";
import { useSelector, useDispatch , Navigate } from 'react-redux';
// import img from '../../../../pages/addressBook/images/images.png'


function ContactModal (contact, setIsModalOpen) {

    const [selectedContact, setSelectedContact] = useState(null);
    const dispatch = useDispatch();
    const [previewSrc, setPreviewSrc] = useState('');
    const [image, setImage] = useState(contact.contact.contactPhoto);
    const [imageFile, setImageFile ] = useState("");
    const navigate = useNavigate();

    console.log('modalContact' , contact);

    const [form, setForm] = useState ({

        contactPhoto: image,
        contactName : "",
        company : "",
        department : "",
        contactEmail : "",
        contactPhone : "",
        companyPhone : "",
        companyAddress : "",
        memo : "",
    })

    
    
    

    const closeModal = () => {
        setSelectedContact(null);

        window.location.reload();
    };

    const updateSuccess = () => {

        

        setIsModalOpen(false)

    }

    
    const onChangeHandler = (e) => {

        setForm ({
            ...form,
            [e.target.name]: e.target.value
            
        })

        console.log('form', form);
        
    }

    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        console.log("사진파일",e.target.files[0]);

        setImageFile(image);

        setImage(URL.createObjectURL(image));
    };


    
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                const previewElement = document.getElementById(style.preview);
                if (previewElement) {
                    previewElement.src = e.target.result;

                    setPreviewSrc(e.target.result); 
                }
            };
            reader.readAsDataURL(input.files[0]);
            
        } else {
            const previewElement = document.getElementById(style.preview);
            if (previewElement) {
                previewElement.src = "";
                setPreviewSrc('');
            }
        }

    }

    const updateSuccessHandler = () => {

        const formData = new FormData();

        formData.append("contactName", form.contactName);
        formData.append("company", form.company);
        formData.append("department", form.department)
        formData.append("contactEmail", form.contactEmail);
        formData.append("contactPhone", form.contactPhone);
        formData.append("companyPhone", form.companyPhone);
        formData.append("companyAddress", form.companyAddress);
        formData.append("memo", form.memo);

        
        
        if(imageFile){
            formData.append("contactPhoto", imageFile);
        }

        for(let [name, value] of formData) {
            console.log('name', name);
            console.log('value', value);
            
        }


        dispatch(callContactUpdateAPI({
            
            contactCode : contact.contact.contactCode,
            form : formData
        }))
    }



    return (
        <>
                    {contact && (
                <div className={style.modalOverlay}>
                <div className={style.modalContent}>
                    <button className={style.closeModalButton} onClick={closeModal}>
                    &times;
                    </button>
                    <div className={style.contentTitle}>
                    <h2>{contact.contact.contactName} 연락처 수정</h2>
                    </div>
                    <div className={style.contentModal}>
                    <strong>사진:</strong> 
                                        <img src= {image} id={style.preview} style={{width: '100px', height: '100px', borderRadius: "50px"}}/>
                                                    
                                                    <input
                                                            type="file"
                                                            id="fileInput"
                                                            onChange={(e) => {
                                                                readURL(e.target);
                                                                onChangeImageUpload(e);
                                                            }}
                                                            style={{ display: 'none' }}
                                                        />
                                                    <label htmlFor="fileInput" class={style.customFileInput} name='contactPhoto'>
                                                        사진 첨부
                                                    </label> <br />
                    <strong>이름:</strong> <input type='text' placeholder={contact.contact.contactName} onChange={ onChangeHandler } name='contactName' className='content' /> <br />
                    <strong>회사:</strong> <input type='text' placeholder={contact.contact.company} onChange={ onChangeHandler } name='company' className='content'/> <br />
                    <strong>부서:</strong> <input type='text' placeholder={contact.contact.department} onChange={ onChangeHandler } name='department' className='content'/> <br />
                    <strong>이메일:</strong> <input type='text' placeholder={contact.contact.contactEmail} onChange={ onChangeHandler } name='contactEmail' className='content'/> <br />
                    <strong>휴대폰:</strong><input type='text' placeholder={contact.contact.contactPhone} onChange={ onChangeHandler } name='contactPhone' className='content'/> <br />
                    <strong>회사전화:</strong> <input type='text' placeholder={contact.contact.companyPhone} onChange={ onChangeHandler } name='companyPhone' className='content'/> <br />
                    <strong>회사주소:</strong> <input type='text' placeholder={contact.contact.companyAddress} onChange={ onChangeHandler } name='companyAddress' className='content'/> <br />
                    <strong>메모:</strong> <input type='text' placeholder={contact.contact.memo} onChange={ onChangeHandler } name='memo' className='content'/> <br />
                    </div>
                <div className={style.contentButton}>
                <button onClick={ updateSuccessHandler } >수정완료</button>
                
                </div>
                        
                    </div>
                </div>
      )}
        
        </>    
    )
}


export default ContactModal;


