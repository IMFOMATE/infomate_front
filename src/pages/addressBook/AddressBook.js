import style from './AddressBook.module.css';
import img1 from './images/free-icon-star-1163655.png';
import img2 from './images/free-icon-star-126482.png'
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    callSelectAPI, callUpdateAPI, callDeleteContactAPI
} from '../../apis/ContactAPIcalls';
import { Search, South } from '@mui/icons-material';
import ContactModal from '../../../src/components/approval/ele-component/contact/ContactModal';



const selectButton = ["전체","ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

function AddressBook({ title }) {

    const dispatch = useDispatch();
    const contact = useSelector(state => state.contactReducer);

    const contactList = contact.data;
    const params = useParams();
    

    useEffect(
        () => {
            dispatch(callSelectAPI({
                memberCode: params.memberCode
            }));
            
        },[])
    ;

    useEffect(() => {
        setMatchingNames(contactList);
        
      }, [contactList]);



    const [selectName, setSelectName] = useState("");
    const [matchingNames, setMatchingNames] = useState([]);
    // const [check, setCheck] = useState(false);
    function getConstantVowel(kor) {
        const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',];
        const ga = 44032;
        const uni = kor.charCodeAt(0);

        if (uni >= ga && uni <= ga + 11172) {
            const fn = parseInt((uni - ga) / 588);
            return {
                f: f[fn],
            };
        } else {
            return {
                f: kor,
            };
        }
    }

 

    const [ starButton, setStarButton ] = useState(img2);

    const chooseHandler =  (contact, index) => {
        
        const updatedStates = [...starButton];
        updatedStates[index] = !updatedStates[index]; 
        setStarButton(updatedStates);
        
        

        const code = contact.contactCode;

        console.log('연락처 코드' , code);
        
        

        dispatch(callUpdateAPI({
            contactCode: code,
            contactLike: updatedStates[index] ? 'Y' : 'N', 
        }));

        console.log('요청후 받아오는 상태값',contact.contactLike);
        

        if (contact.contactLike === 'Y') {
            setStarButton(img2);
            alert("즐겨찾기가 해제되었습니다.")
            window.location.reload();
        } else {
            setStarButton(img1);
            alert("즐겨찾기가 등록되었습니다.")
            window.location.reload();
        }
    }

    const onDeleteContactHandler = (contactCode) => {

        console.log("contactCode " , contactCode);

            dispatch(callDeleteContactAPI( {
                contactCode : contactCode
            }))
        closeModal();
    }

    const handleSearch = (name) => {

        
        setSelectName(name);
        console.log(name); 
        

        let serach = [];

        contactList.map((contact) => {
            console.log(getConstantVowel(contact.contactName.charAt(0)).f === name);
            
                if (name === '전체') {
                    console.log(contact);
                    serach.push(contact)
                    
                }       
                
                if (getConstantVowel(contact.contactName.charAt(0)).f === name) {
                    if(contact !== undefined) {
                        console.log("================> \n",contact);
                        serach.push(contact);
                    
                        
                    }
                }
        })
        console.log(serach);
        setMatchingNames(serach);
    
    };

    const [selectedContact, setSelectedContact] = useState(null);

    const closeModal = () => {
        setSelectedContact(null);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);



    const buttonStyle = { fontWeight: '800', fontSize: '15px', color: 'black' }


    return (
        <>
            <div className={style.wrapper} >
                <h1 style={{ color: 'var(--color-text-title)' }} className={style.title}>{title}</h1>
                <div className={style.addressSearch}>
                    <div className={style.addressText}>이름</div>
                    <div className={style.addressText}>전화번호</div>
                    <div className={style.addressText}>메모</div>
                </div>

                <div className={style.selectButton} style={buttonStyle}>
                    
                    {selectButton.map((name, index) => (
                        <button
                            key={index}
                            onClick={() => handleSearch(name)}
                            className={selectName === name ? 'selected' : ''}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                <div className={style.addressSubtitle}>
                    <div className={style.onstartButton}><img src={img1} alt="" /></div>
                    <div className={style.addressName}>이름</div>
                    <div className={style.addressPhone}>휴대폰</div>
                    <div className={style.addressEmail}>이메일</div>
                    <div className={style.addressMemo}>메모</div>
                </div>

                
                

                <div className={style.addressContent}>
                    {matchingNames && matchingNames.map (
                        (contact, index) => (

                            <div key={contact.contactCode} className={`modal ${isModalOpen ? 'modal-open' : ''}`} >
                                <button className={style.starButton} onClick={() => chooseHandler(contact)}>
                                    {
                                        // <img src={ starButton === img1 ? img1 : img2 } alt="" />
                                        // <img src={starButton[index] ? img1 : img2} alt='' />
                                        <img src={contact.contactLike === 'Y'? img1 : img2}  alt=''/>
                                    }
                                </button>
                                <div className={style.addressName} onClick={() => setSelectedContact(contact)} >{contact.contactName} </div>  
                                <div className={style.addressPhone}>{contact.contactPhone} </div>
                                <div className={style.addressEmail}>{contact.contactEmail} </div>
                                <div className={style.addressMemo}>{contact.memo} </div>
                            </div>

                        )

                    )}
                    

                </div>

            </div>
            {selectedContact && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <button className={style.closeModalButton} onClick={closeModal}>
                        &times;
                        </button>
                        <div className={style.contentTitle}>
                        <h2>{selectedContact.contactName} 연락처 정보</h2>
                        </div>
                        <div className={style.contentModal}>
                        <p className='content'><strong>사진:</strong> <img src={selectedContact.contactPhoto} alt="프로필 사진" /></p>
                        <p className='content'><strong>이름:</strong> {selectedContact.contactName}</p>
                        <p className='content'><strong>회사:</strong> {selectedContact.company}</p>
                        <p className='content'><strong>부서:</strong> {selectedContact.department}</p>
                        <p className='content'><strong>이메일:</strong> {selectedContact.contactEmail}</p>
                        <p className='content'><strong>휴대폰:</strong> {selectedContact.contactPhone}</p>
                        <p className='content'><strong>회사전화:</strong> {selectedContact.companyPhone}</p>
                        <p className='content'><strong>회사주소:</strong> {selectedContact.companyAddress}</p>
                        <p className='content'><strong>메모:</strong> {selectedContact.memo}</p>
                        </div>
                    <div className={style.contentButton}>
                    
                    <button onClick={ () => onDeleteContactHandler(selectedContact.contactCode) }>삭제</button>
                    </div>
                        
                    </div>
                </div>
      )}
     
        
        </>
    )


}

export default AddressBook;