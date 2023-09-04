import style from './MailWrite.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback, ChangeEvent, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import MailContactModal from '../../components/approval/ele-component/contact/MailContactModal';
import { callSelectAPI } from '../../apis/ContactAPIcalls'
import { callPostMailAPI } from '../../apis/MailAPICalls';
import MailReferenceModal from '../../components/approval/ele-component/contact/MailReferenceModal';
import axios from "axios";


function MailWrite() {

    const contact = useSelector(state => state.contactReducer);
    const contactList = contact.data;
    const [isModalOpen, setModalOpen] = useState(false); 
    const [isReferenceModalOpen, setReferenceModalOpen] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState([]);
    const [file, setfile] = useState([]);
    const quillRef = useRef()
    const [content, setContent] = useState("")
    const [encoding, setencoding] = useState("");
    
    const [form, setForm] = useState({

        mailContent: "",
        memberCode: "",
        mailStatus: "N",
        mailTitle: "",
        mailLike: "N",
        mailReference: [],
        receiverMail: [],
        mailFile:[]
    })

    function extractBase64ImagesFromQuillContent(content) {
        const container = document.createElement('div');
        container.innerHTML = content;
        const imgElements = container.querySelectorAll('img');
        const base64Images = [];
      
        imgElements.forEach((imgElement) => {
          const src = imgElement.getAttribute('src');
          if (src && src.startsWith('data:image/')) {
            base64Images.push(src);
          }
        });
      
        return base64Images;
      }

  

            


    const handleDragStart = (e) => {
        e.preventDefault();
        setDragging(true);
        onChangeHandler(e)
    };

    const handleDragEnd = () => {
        setDragging(false);
        
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(true);

        const files = Array.from(e.dataTransfer.files)

        setfile(prevFile => ([...prevFile, ...files]));


        console.log('asd',e.dataTransfer.files);

        const fileNames = files.map(file => file.name);
        console.log('드롭한 파일:', fileNames);

        setDroppedFiles(prevFiles => [...prevFiles, ...fileNames]); // 이전 파일 목록에 새 파일 추가

    };

    

    const dispatch = useDispatch();

    const [receiver, setReceiver] = useState([]);

    const [reference, setReference ] = useState([]);

    useEffect(
        () => {
            dispatch(callSelectAPI({
                // memberCode: params.memberCode
            }));
            
        },[])
    ;

    const quillstyle = {
        width: "91%",
        height: "400px",
        marginTop: "30px",
    }

    const onChangeHandler = (e) => {
            
    console.log('======',e);
    
        setForm({
                ...form,
                [e.target.name]: e.target.value,
        });
    };


    const closeModalWrite = () => {
        setModalOpen(false);
        
        const receiverMails = receiver.map((name) => name.contactName);
        setForm({
            ...form,
            receiverMail: receiverMails,
        });
    }

    const openModal = () => {
        setModalOpen(true);
        
    };

    const openReferenceModal = () => {
        setReferenceModalOpen(true)
    }

    const closeReferenceModal = () => {
        setReferenceModalOpen(false);

        const referenceMails = reference.map((name) => name.contactName);
        setForm({
            ...form,
            mailReference: referenceMails,
        });
    }

    const onSendButtonHandler = () => {

        const formData = new FormData();
        console.log("form", form);
        
        formData.append('receiverMail', form.receiverMail);  
        formData.append('mailReference', form.mailReference);  
        formData.append("mailTitle", form.mailTitle );

        if(file){
            for (const singleFile of file) {
                formData.append("mailFile", singleFile); 
        }
        }


            // Quill 에디터 컨텐츠에서 이미지 base64 데이터 추출
            const base64Images = extractBase64ImagesFromQuillContent(content);

            // Blob으로 변환한 이미지 데이터를 저장할 배열
            const imageBlobs = [];

            // 이미지 base64 데이터를 Blob으로 변환
            base64Images.forEach((base64) => {
            const contentType = base64.split(':')[1].split(';')[0];
            const byteCharacters = atob(base64.split(',')[1]);
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                const slice = byteCharacters.slice(offset, offset + 512);

                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            const blob = new Blob(byteArrays, { type: contentType });
            imageBlobs.push(blob);
            });

            // 이제 imageBlobs 배열에는 Blob 형태의 이미지 데이터가 들어 있습니다.
            console.log('Blob 형태의 이미지 데이터:', imageBlobs);

            formData.append('mailContent', imageBlobs);

        



        
        for(let [name,value] of formData){
            console.log('name', name);
            console.log('value', value);

        }


        
        dispatch(callPostMailAPI({
            form: formData,

        }))

    }

    const modules = useMemo(() => {
        return {
            toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                ["blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ color: [] }, { background: [] }],
                [{ align: [] }, "link", "image"],
            ],
            // handlers: {
            //     image: imageHandler
            // }
            },
        }
    }, [])


    return (
        <>

                    <div className={style.container}>
                        <div className={style.titleButton}>
                        <h1 style={{ color: 'var(--color-text-title)' }}>메일쓰기</h1>
                        <button className={style.sendButton} onClick={ onSendButtonHandler }>보내기</button>
                    </div>
                    <div className={style.content}>

                            <div className={style.receiver} >
                                받는사람

                                <input type="text" className={style.inputText} name="receiverMail" onChange={ () => onChangeHandler } value={receiver.map( (name) => name.contactName )}/>
                                <button className={style.addressBook}  onClick={  openModal }>주소록</button>
                            </div>
                                

                            <div className={style.reference}>
                                참조
                            

                                <input type="text" className={style.inputText} name="mailReference" onChange={ onChangeHandler } value={reference.map( (name) => name.contactName )}/>
                                <button  className={style.addressBook} onClick={ openReferenceModal }>주소록</button>
                            </div>


                            <div className={style.mailTitle} >
                                제목
                            
                                <input type={style.text} className={style.inputText} name="mailTitle" onChange={onChangeHandler}/>

                            </div>
                            <div className={ style.attachedFile}>
                                첨부파일

                                <div className={ style.uploadBox}  onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDrop}
                                    style={{
                                        border: '2px dashed #ccc',
                                        textAlign: 'center',
                                        lineHeight: '200px',
                                        backgroundColor: dragging ? 'gray' : 'white',
                                    }}>
                                    <p>{dragging ? '' : '여기로 파일을 드래그하세요'}</p>

                                    {droppedFiles && (
                                        <div >
                                                {droppedFiles.map((fileName, index) => (
                                        <p key={index}>{fileName}</p>
                                    ))}
                                            
                                            
                                        </div>
                                        )}
                                </div>
                            </div>

                    </div>
                    <div className={style.quill}>
                        <ReactQuill  style={ quillstyle } 
                            theme="snow"
                            ref={quillRef}
                            value={content}
                            onChange={setContent}
                            modules={modules}/>
                    </div>
                    
                    </div>
                    {isModalOpen && (
                <MailContactModal isOpen={isModalOpen} closeModal={closeModalWrite} contact={contactList} setReceiver={setReceiver} receiver={receiver} />
                    )}

                    {isReferenceModalOpen && (
                <MailReferenceModal isOpen={isReferenceModalOpen} closeModal={closeReferenceModal} contact={contactList} setReference={setReference} reference={reference} />
                    )}


            
        </>    
    )
}

export default MailWrite;