import React from 'react';
import '../../components/common/header/default.css';
import style from './AddContact.module.css'
import img from './images/images.png'


function AddContact() {

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
                    <h1 style={{ color: 'var(--color-text-title)'}}>연락처 추가</h1>
                    <div class={style.contactInformation}>
                        <ul>
                            <li class={style.contactFile}>
                                <p>사진</p>
                                <img src= {img} id={style.preview} style={{width: '100px', height: '100px'}}/>
                                
                                <input type="file" id="fileInput" onChange={(e) => readURL(e.target)} style={{display: 'none'}}/>
                                <label for="fileInput" class={style.customFileInput}>
                                    사진 첨부
                                </label>
                            </li>
                            <li>
                                <p class={style.contactText}>이름</p> <input type="text"/>
                                
                            </li>
                            <li>
                                <p class={style.contactText}>회사</p>
                                <input type="text"/>
                            </li>
                            <li>    
                                <p class={style.contactText}>부서</p>
                                <input type="text"/>
                            </li>
                            <li>
                                <p class={style.contactText}>직위</p>
                                <input type="text"/>
                            </li>
                            <li>
                                <p class={style.contactText}>이메일</p>
                                <input type="text"/>
                            </li>
                            <li>
                                <p class={style.contactText}>휴대폰</p>
                                <input type="text"/>
                            </li>
                            <li>
                                <p class={style.contactText}>회사전화</p>
                                <input type="text"/>
                            </li>
                            <li>
                                <p class={style.contactText}>회사 주소</p>
                                <input type="text"/>
                            </li>
                            <li>
                                <p class={style.contactText}>회사 주소</p>
                                <input type="text"/>
                            </li>

                            <li>
                                <p class={style.contactText}>메모</p>
                                <input type="text"/>
                            </li>
                        </ul>

                        <button class={style.contactSave}>저장</button>
                    </div>
                </div>
        </>  
    )
}


export default AddContact;