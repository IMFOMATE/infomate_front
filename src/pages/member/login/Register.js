import RegisterCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { POST_LOGIN } from "../../../modules/MemberModule"
import { RESET_REGIST } from '../../../modules/MemberRegisterModule';
import {
    callRegisterAPI
} from '../../../apis/MemberAPICalls'

function Register() {

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();

    const loginMember = useSelector(state => state.memberReducer);
    console.log("loginMember : ", loginMember);

    const member = useSelector(state => state.registMemberReducer); 
    console.log("member : ", member);

    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();

    const [form, setForm] = useState({
        memberId: '',
        memberPassword: '',
        memberName: '',
        memberEmail: '',
        memberPhone: '',
        memberNo: '',
        memberStatus: '',
        memberAddress: '',
        hireDate: '',
        deptCode: '',
        rankCode: '',
        memberOff: '',
    });

    useEffect(() => {

        if (image) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                    setImageUrl(result);
                }
            };
            reader.readAsDataURL(image);
        }
    },
        [image]);

    console.log("image : ", image);

    const [errors, setErrors] = useState({
        memberId: '',
        memberPassword: '',
        memberEmail: '',
        memberPhone: '',
        memberNo: '',
        memberOff: '',
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            memberId: '',
            memberPassword: '',
            memberEmail: '',
            memberPhone: '',
            memberNo: '',
            memberOff: '',
        };

        // 간단한 유효성 검사 예시
        if (form.memberId.trim() === '') {
            newErrors.memberId = '아이디를 입력하세요.';
            isValid = false;
        }

        if (form.memberPassword.trim() === '') {
            newErrors.memberPassword = '패스워드를 입력하세요.';
            isValid = false;
        }

        if (!form.memberEmail.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
            newErrors.memberEmail = '올바른 이메일 주소를 입력하세요.';
            isValid = false;
        }

        if (!form.memberPhone.match(/^\d{10,11}$/)) {
            newErrors.memberPhone = '올바른 핸드폰 번호를 입력하세요.';
            isValid = false;
        }

        if (!form.memberNo.match(/^\d{8}$/)) {
            newErrors.memberNo = '올바른 생년월일을 입력하세요.';
            isValid = false;
        }

        const birthYear = form.memberNo.substring(0, 4);
        const birthMonth = form.memberNo.substring(4, 6);
        const birthDay = form.memberNo.substring(6, 8);

        if (birthMonth < 1 || birthMonth > 12) {
            newErrors.memberBirthMonth = '올바른 월을 입력하세요 (1에서 12 사이).';
            isValid = false;
        }

        const daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
        if (birthDay < 1 || birthDay > daysInMonth) {
            newErrors.memberBirthDay = `올바른 일을 입력하세요 (1에서 ${daysInMonth} 사이).`;
            isValid = false;
        }

        if (form.memberOff < 0 || form.memberOff > 25) {
            newErrors.memberOff = '보유연차는 0에서 25 사이여야 합니다.';
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };

    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const onClickMemberRegistrationHandler = () => {
        console.log('[MemberRegistration] onClickMemberRegistrationHandler');


        if (validateForm()) {

            const formData = new FormData();

            formData.append("memberId", form.memberId);
            formData.append("memberPassword", form.memberPassword);
            formData.append("memberName", form.memberName);
            formData.append("memberEmail", form.memberEmail);
            formData.append("memberPhone", form.memberPhone);
            formData.append("memberNo", form.memberNo);
            formData.append("memberStatus", form.memberStatus);
            formData.append("memberAddress", form.memberAddress);
            formData.append("hireDate", form.hireDate);
            formData.append("deptCode", form.deptCode);
            formData.append("rankCode", form.rankCode);
            formData.append("memberOff", form.memberOff);

            if (image) {
                formData.append("memberPic", image);
            }
            
            dispatch(callRegisterAPI({
                form: form,
                image: image,
            }));

        }
    }

    useEffect(() => {
        if (member.status === 201) {
            alert('회원이 등록되었습니다.');
            console.log("[Login] Register SUCCESS {}", member);
            dispatch({ type: RESET_REGIST});

            // navigate("/main", { replace: true })
            window.location.reload();
        }
    },
        [member]);


    return (
        <div>
            <div className={RegisterCSS.registContainer}>
                <h1 className={RegisterCSS.heading}>회원등록</h1>
                <div className={RegisterCSS.registSection}>
                    <div className={RegisterCSS.registInfoDiv}>
                        <div className={RegisterCSS.registImageDiv}>
                            <label>프로필 사진</label>
                            {imageUrl && <img
                                className={RegisterCSS.profileImage}
                                src={imageUrl}
                                alt="profileImg"
                            />}
                            <input
                                style={{ display: 'none' }}
                                type="file"
                                name='memberPic'
                                accept='image/jpg,image/png,image/jpeg,image/gif'
                                onChange={onChangeImageUpload}
                                ref={imageInput}
                            />
                            <button
                                className={RegisterCSS.profileImageButton}
                                onClick={onClickImageUpload}
                            >
                                이미지 업로드
                            </button>
                        </div>
                    </div>

                    <div className={RegisterCSS.registInfoDiv}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><label>아이디</label></td>
                                    <td>
                                        <input
                                            className={RegisterCSS.registInfoInput}
                                            type="text"
                                            name="memberId"
                                            placeholder="아이디"
                                            autoComplete='off'
                                            onChange={onChangeHandler}
                                        />
                                        <div className="error">{errors.memberId}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>패스워드</label></td>
                                    <td>
                                        <input
                                            className={RegisterCSS.registInfoInput}
                                            type="password"
                                            name="memberPassword"
                                            placeholder="패스워드"
                                            autoComplete='off'
                                            onChange={onChangeHandler}
                                        />
                                        <div className="error">{errors.memberPassword}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>이름</label></td>
                                    <td>
                                        <input
                                            className={RegisterCSS.registInfoInput}
                                            type="text"
                                            name="memberName"
                                            placeholder="이름"
                                            autoComplete='off'
                                            onChange={onChangeHandler}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>이메일</label></td>
                                    <td>
                                        <input
                                            className={RegisterCSS.registInfoInput}
                                            type="text"
                                            name="memberEmail"
                                            placeholder="이메일"
                                            autoComplete='off'
                                            onChange={onChangeHandler}
                                        />
                                        <div className="error">{errors.memberEmail}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>핸드폰</label></td>
                                    <td>
                                        <input
                                            className={RegisterCSS.registInfoInput}
                                            type="text"
                                            name="memberPhone"
                                            placeholder="핸드폰"
                                            autoComplete='off'
                                            onChange={onChangeHandler}
                                        />
                                        <div className="error">{errors.memberPhone}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>생년월일</label></td>
                                    <td>
                                        <input
                                            className={RegisterCSS.registInfoInput}
                                            type="text"
                                            name="memberNo"
                                            placeholder="생년월일 (예: 19901231)"
                                            autoComplete='off'
                                            onChange={onChangeHandler}
                                        />
                                        <div className="error">{errors.memberNo}</div>
                                    <div className="error">{errors.memberBirthMonth}</div>
                                    <div className="error">{errors.memberBirthDay}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>재직여부</label></td>
                                    <td>
                                        
                                        <select
                                            onChange={onChangeHandler}
                                            className={RegisterCSS.registInfoInput}
                                            name='memberStatus'
                                            defaultValue={0}>
                                            <option value={0} disabled>재직여부</option>
                                            <option value="Y">Y</option>
                                            <option value="N">N</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>내선번호</label></td>
                                    <td>
                                        <input
                                            className={RegisterCSS.registInfoInput}
                                            type="text"
                                            name="extensionNumber"
                                            placeholder="내선번호"
                                            autoComplete='off'
                                            onChange={onChangeHandler}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>주소</label></td>
                                    <td>
                                        <input
                                            className={RegisterCSS.registInfoInput}
                                            type="text"
                                            name="memberAddress"
                                            placeholder="주소"
                                            autoComplete='off'
                                            onChange={onChangeHandler}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>입사일</label></td>
                                    <td>
                                        <input
                                            className={RegisterCSS.registInfoInput}
                                            type="date"
                                            name="hireDate"
                                            autoComplete='off'
                                            onChange={onChangeHandler}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>부서</label></td>
                                    <td>
                                        <select
                                            onChange={onChangeHandler}
                                            className={RegisterCSS.registInfoInput}
                                            name='deptCode'
                                            defaultValue={0}
                                        >
                                            <option value={0} disabled>부서</option>
                                            <option value={1}>본부</option>
                                            <option value={2}>영업팀</option>
                                            <option value={3}>개발팀</option>
                                            <option value={4}>인사팀</option>
                                            <option value={5}>총무팀</option>
                                            <option value={6}>마케팅팀</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>직급</label></td>
                                    <td>
                                        <select
                                            onChange={onChangeHandler}
                                            className={RegisterCSS.registInfoInput}
                                            name='rankCode'
                                            defaultValue={-1}
                                        >
                                            <option value={-1} disabled>직급</option>
                                            <option value={1}>대표이사</option>
                                            <option value={2}>상무</option>
                                            <option value={3}>부장</option>
                                            <option value={4}>차장</option>
                                            <option value={5}>과장</option>
                                            <option value={6}>대리</option>
                                            <option value={7}>사원</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>보유연차</label></td>
                                    <td>
                                        <input
                                            className={RegisterCSS.registInfoInput}
                                            type="number"
                                            name="memberOff"
                                            placeholder="보유연차"
                                            autoComplete='off'
                                            max={25}
                                            min={0}
                                            onChange={onChangeHandler}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={RegisterCSS.registButtonDiv}>
                    <button
                        className={RegisterCSS.button}
                        onClick={onClickMemberRegistrationHandler}
                    >
                        회원등록
                    </button>
                    <button
                        className={RegisterCSS.button}
                        onClick={() => navigate(-1)}
                    >
                        돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;