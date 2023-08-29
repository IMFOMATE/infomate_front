
import style from './AddContact.module.css'
import img from './images/images.png'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';


import {
    callRegistAPI
} from '../../apis/ContactAPIcalls'
import { POST_REGISTER } from '../../modules/ContactModule';



function AddContact({title}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.contactReducer); 
    const imageInput = useRef();
    const [image, setImage] = useState(null);

    const [form, setForm] = useState ({
        contactPhoto: '',
        name: '',
        company: '',
        department: '',
        email: '',
        phone: '',
        companyPhone: '',
        companyAddress: '',
        memo: '',
        like: 'N',

        
    
    })

    useEffect(() => {
        if(member.status === 201){
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/login", { replace: true })
        }
    },
    [member, navigate]);

    if(member.length > 0) {
        console.log("[Login] Login is already authenticated by the server");        
        navigate("/", { replace: true })
    }

    const onChangeHandler = (e) => {
        setForm( {

            ...form,
            [e.target.name]: e.target.value
        })
    }





    const onClickRegisterHandler = () => {

        const formData = new FormData();

        
        formData.append('name', form.name);  
        console.log("======", form.name);
        formData.append('company', form.company);  
        formData.append('department', form.department);  
        formData.append('email', form.email);  
        formData.append('phone', form.phone);  
        formData.append('companyPhone', form.companyPhone);  
        formData.append('companyAddress', form.companyAddress);  
        formData.append('memo', form.memo);  
        formData.append('like', form.like);  

        console.log("ddfsaf",formData);
        
        if(image){
            formData.append("contactPhoto", image);
        }


        navigate("/addressBook");
        dispatch(callRegistAPI({
            form: formData,

        }))
    }


    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    };

    

 

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                const previewElement = document.getElementById(style.preview);
                if (previewElement) {
                    previewElement.src = e.target.result;

                    
                }
            };
            reader.readAsDataURL(input.files[0]);
            
        } else {
            const previewElement = document.getElementById(style.preview);
            if (previewElement) {
                previewElement.src = "";
            }
        }

    }
    


   
    return (
        <>

        
             <div class="wrapper">
                    <h1 style={{ color: 'var(--color-text-title)'}}>{title}</h1>
                    <div class={style.contactInformation}>
                        <ul>
                            <li class={style.contactFile}>
                                <p>사진</p>
                                <img src= {img} id={style.preview} style={{width: '100px', height: '100px'}}/>
                                
                                <input type="file"  id="fileInput" onChange={(e) => readURL(e.target)} style={{display: 'none'}} onClick={ onChangeImageUpload }/>
                                <label for="fileInput" class={style.customFileInput} name='contactPhoto'>
                                    사진 첨부
                                </label>
                            </li>
                            <li>
                                <p class={style.contactText}>이름</p> 
                                <input type="text" autoComplete='off' name='name' onChange={ onChangeHandler }/>
                                
                            </li>
                            <li>
                                <p class={style.contactText}>회사</p>
                                <input type="text" autoComplete='off' name='company' onChange={ onChangeHandler }/>
                            </li>
                            <li>    
                                <p class={style.contactText}>부서</p>
                                <input type="text" autoComplete='off' name='department' onChange={ onChangeHandler }/>
                            </li>
                            <li>
                                <p class={style.contactText}>이메일</p>
                                <input type="text" autoComplete='off' name='email' onChange={ onChangeHandler }/>
                            </li> 
                            <li>
                                <p class={style.contactText}>휴대폰</p>
                                <input type="text" autoComplete='off' name='phone' onChange={ onChangeHandler }/>
                            </li>
                            <li>
                                <p class={style.contactText}>회사전화</p>
                                <input type="text" autoComplete='off' name='companyPhone' onChange={ onChangeHandler }/>
                            </li>
                            <li>
                                <p class={style.contactText}>회사 주소</p>
                                <input type="text" autoComplete='off' name='companyAddress' onChange={ onChangeHandler }/>
                            </li>
                            <li>
                                <p class={style.contactText}>메모</p>
                                <input type="text" autoComplete='off' name='memo' onChange={ onChangeHandler }/>
                            </li>
                        </ul>

                        <button class={style.contactSave} onClick={ onClickRegisterHandler } >저장</button>
                    </div>
                </div>
        </>  
    )
}


export default AddContact;