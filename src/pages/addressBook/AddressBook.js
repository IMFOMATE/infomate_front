import style from './AddressBook.module.css';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    callSelectAPI
} from '../../apis/ContactAPIcalls'
import { Search } from '@mui/icons-material';

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
            setMatchingNames(contactList);
        }
        ,[contactList]
    );

    

    const [selectName, setSelectName] = useState("");
    const [matchingNames, setMatchingNames] = useState([]);

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

    const handleSearch = (name) => {
        setSelectName(name);
        console.log(name);

        

        let serach = [];




        contactList.map((contact) => {
            console.log(getConstantVowel(contact.contactName.charAt(0)).f === name);

       

                if (name === '전체') {
                    console.log(contact);
                    serach.push(contact)
                    setSelectName(contact)
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

                <div id="selectButton">
                    
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
                    <div className={style.addressName}>이름</div>
                    <div className={style.addressPhone}>휴대폰</div>
                    <div className={style.addressEmail}>이메일</div>
                    <div className={style.addressMemo}>메모</div>
                </div>

                <div className={style.addressContent}>
                    {matchingNames && matchingNames.map (
                        (contact) => (

                            <div key={contact.contactCode} >
                                <div className={style.addressName}>{contact.contactName} </div>
                                <div className={style.addressPhone}>{contact.contactPhone} </div>
                                <div className={style.addressEmail}>{contact.contactEmail} </div>
                                <div className={style.addressMemo}>{contact.memo} </div>
                            </div>

                        )

                    )}

                </div>

            </div>
        </>
    )


}

export default AddressBook;