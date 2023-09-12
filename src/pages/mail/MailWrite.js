import style from './MailWrite.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate , useLocation} from 'react-router-dom';
import { useEffect, useState, useRef, useCallback, ChangeEvent, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import MailContactModal from '../../components/approval/ele-component/contact/MailContactModal';
import { callPostMailAPI  ,callMailContactSelectAPI } from '../../apis/MailAPICalls';
import MailReferenceModal from '../../components/approval/ele-component/contact/MailReferenceModal';
import axios from "axios";
import { callGetMemberAPI } from '../../apis/MemberMailAPICalls';
import { ReplayCircleFilled } from '@mui/icons-material';


function MailWrite() {

    const contact = useSelector(state => state.mailReducer);
    const contactList = contact?.data;
    const [isModalOpen, setModalOpen] = useState(false); 
    const [isReferenceModalOpen, setReferenceModalOpen] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState([]);
    const [file, setfile] = useState([]);
    const quillRef = useRef()
    const [content, setContent] = useState("")
    const [encoding, setencoding] = useState("");
    const [receiver, setReceiver] = useState([]);
    const [receiverName, setReceiverName] = useState([]);
    const navigate = useNavigate();

    const [reference, setReference ] = useState([]);

    const [company, setCompany] = useState([]);
    const member = useSelector(state => state.memberMailReducer)
    const memberList = member.data;
    console.log("memberList" , memberList);

    const authTokenJSON = localStorage.getItem('authToken');

    // JSON 형식의 데이터를 JavaScript 객체로 파싱
     const authToken = JSON.parse(authTokenJSON);
 
     // 회원 코드를 가져옴
     const memberCode = authToken.memberCode;



    useEffect(
        () => {
            dispatch(callGetMemberAPI({	
                
            }));            
        }
        ,[]
    );

    const location = useLocation();

    const { checkedName , sendMail} = location.state || {};
    

    console.log(checkedName);

    console.log(sendMail);

    
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

    const handleImageUpload = useCallback((e) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
    
        input.onchange = async () => {
          const file = input.files[0];
          if (file) {
            // 이미지를 FormData에 추가하고, 서버에 업로드 로직을 구현하여 이미지를 저장할 수 있습니다.
            const formData = new FormData();
            formData.append('mailContent', file);
            for(let [name, value] of formData) {
                console.log('name', name);
                console.log('value', value);
                
            }
    
            try {
              // 서버로 이미지를 업로드하고 이미지 URL을 받아올 수 있습니다.
              const response = await axios.post('http://localhost:8989/mail/img', formData); // '/api/upload-image'는 실제 업로드 엔드포인트에 맞게 수정해야 합니다.
              const imageUrl = response.data.data;
              console.log('image' , imageUrl);
              
    
              // 이미지를 에디터에 삽입
              const range = quillRef.current.getEditor().getSelection();
              quillRef.current.getEditor().insertEmbed(range.index, 'image', imageUrl);
            } catch (error) {
              console.error('이미지 업로드 실패:', error);
            }
          }
        };
      }, []);

  
            


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



    useEffect(
        () => {
            dispatch(callMailContactSelectAPI({
                memberCode: memberCode,
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
        // console.log(receiver);
        formData.append("memberCode" , memberCode)
        formData.append('receiverMail', receiverName);  
        formData.append('mailReference', form.mailReference);  
        formData.append("mailTitle", form.mailTitle );

        if(file){
            for (const singleFile of file) {
                formData.append("mailFile", singleFile); 
        }
        }

        formData.append("mailContent", content);
        
        for(let [name,value] of formData){
            console.log('name', name);
            console.log('value', value);

        }


        dispatch(callPostMailAPI({
            form: formData,

        }))

        navigate("/mail")

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
            handlers: {
                image: handleImageUpload
            }
            },
        }
    }, [])


    const onChangeNameHandler = () => {
        const list = [];
        console.log("gd", receiver);
    
        receiver.map((receiverItem) => {
            list.push(receiverItem.contactName);
        });
        company.map((companyItem) => {
            list.push(companyItem.memberName);
        });
    
        console.log("List", list );



        setReceiverName(list);

        
    };

    return (
        <>

                    <div className={style.container}>
                        <div className={style.titleButton}>
                        <h1 style={{ color: 'var(--color-text-title)' }}>메일쓰기</h1>
                        <button className={style.sendButton} onClick={ onSendButtonHandler }>보내기</button>
                    </div>
                    <div className={style.content}>

                            <div className={style.receiver}  >
                                받는사람

                                <input type="text" className={style.inputText} autoComplete='off' name="receiverMail" 
                                onChange={onChangeNameHandler} 
                                value={receiver.map( (name) => name.contactName ) + company.map((memberName) => memberName.memberName ) + (checkedName || '') + (sendMail || '')}
                                />
                                <button className={style.addressBook}  onClick={  openModal }>주소록</button>
                            </div>
                                

                            {/* <div className={style.reference}>
                                참조
                            

                                <input type="text" className={style.inputText} autoComplete='off' name="mailReference" onChange={ onChangeHandler } value={reference.map( (name) => name.contactName )}/>
                                <button  className={style.addressBook} onClick={ openReferenceModal }>주소록</button>
                            </div> */}


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
                <MailContactModal isOpen={isModalOpen} closeModal={closeModalWrite} contact={contactList} 
                                setReceiver={setReceiver} receiver={receiver} onChangeNameHandler={onChangeNameHandler} memberList = {memberList} company={company} setCompany={setCompany}/>
                    )}

                    {isReferenceModalOpen && (
                <MailReferenceModal isOpen={isReferenceModalOpen} closeModal={closeReferenceModal} contact={contactList} setReference={setReference} reference={reference} />
                    )}


            
        </>    
    )
}

export default MailWrite;