import { useContext, useEffect, useState } from 'react';
import styles from './attendUser.module.css';
import meterialIcon from '../../components/common/meterialIcon.module.css';
import CheckBox from '../common/input/CheckBox';
import { ScheduleProvider } from '../../layouts/CalendarLayout';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PART_LIST } from '../../modules/ScheduleMoudule';
import { getParticipantList } from '../../apis/DepartmentAPI';
import { LoadingSpiner } from '../common/other/LoadingSpiner';

export const AttendUser = (props) => {

    const className  = [styles.btn,''].join(' ');

    return (
        <button
            id={props?.id}
            className={className}
            type={props.type}
            onClick={props.onClick}
            style={props.style}>
            {props.value}
        </button>
    )
}

export const AddUser = ({onClick}) => {

    const [toggle, setToggle] = useState(false);
    const [subToggle, setSubToggle] = useState(false);
    const [selDepart, setSelDepart]= useState(0)

    const getMembers = useSelector(state => state.scheduleReducer[GET_PART_LIST])
    const dispatch = useDispatch();

    const className  = [styles.btn,''].join(' ');

    const onClickHandler = (e) => {
        setToggle(!toggle);
        if(!toggle) setSubToggle(false)
    }

    const mainOnClickHandler = (e) => {
        if(!subToggle) setSubToggle(true)
        setSelDepart(parseInt(e.target.id))
    }
    
    useEffect(()=>{
        if(getMembers) return;
        dispatch(getParticipantList());
    },[])


    if(!getMembers) return <LoadingSpiner />

    return (
        <>
            <div className={styles.container} onClick={onClick}>
                <button
                    className={className}
                    onClick={onClickHandler}
                > + 
                </button>
                {   
                    toggle 
                    && <div className={[styles.selectContainer, subToggle ? styles.selectCol2 : styles.selectCol1].join(' ')}>
                        <MainSelect mainData={getMembers.data} setData={selDepart} msOnClick={mainOnClickHandler} />
                        {
                            subToggle 
                            && <SelectmemberList options={getMembers.data.filter(item => item.deptCode === selDepart)[0]}/>
                        }
                    </div>
                }
            </div>
        </>
    )
}

export const MainSelect = ({mainData, msOnClick}) => {
    return (
        <div className={styles.hoverContainer}> 
            {
                mainData.map(item =>     
                    <SelectMainList 
                        key={item.deptCode} 
                        id={item.deptCode} 
                        value={item.deptName} 
                        onClick={msOnClick} 
                    />
                )
            }
        </div>
    )
}


export const SelectMainList = ({id, value, onClick}) => {

    return (
        <button id={id} className={styles.selectListLabel} onClick={onClick}>
            <div id={id} style={{textAlign:'left'}}>
                {value}
            </div>
            <div>
                <span className={meterialIcon.meterialIcon} style={{opacity:'0.7'}}>navigate_next</span>
            </div>
        </button>
    )
}

export const SelectmemberList = ({options, setChk}) => {
    return (
        <div className={styles.selectMemberListContainer}>
            {
                options.members.map(item => 
                        <SelectMember 
                            departmentCode={options.deptCode} 
                            data={item} 
                            setChk={setChk}
                        />
                    )
            }
        </div>
    )
}

export const SelectMember = ({departmentCode, data}) => {

    const {schedule, setSchedule} = useContext(ScheduleProvider);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(()=>{
        setIsChecked(schedule?.data?.participantList?.length > 0 
            && schedule.data.participantList.filter(item => 
                parseInt(item?.member?.memberCode) 
                === parseInt(data.memberCode))[0]);
    },[schedule])

    const AttendUsersChangeHanlder = (e) => {
        if(e.target.checked){
            // if(!schedule) {
            //     setSchedule({data:{participantList: [{member: {memberCode: parseInt(e.target.value), memberName: e.target.name}}]}});
            // }else{
            //     setSchedule({...schedule, data:{...schedule?.data, participantList: [...schedule?.data?.participantList, {member: {memberCode: parseInt(e.target.value), memberName: e.target.name}}]}})
            // }
            setSchedule({...schedule, data:{...schedule?.data,
                 participantList: [...schedule?.data?.participantList,
                     {member: {memberCode: parseInt(e.target.value), 
                        memberName: e.target.name}}
                    ]}
                })
        }else{
            setSchedule({...schedule, data:{...schedule?.data, 
                participantList: [...schedule?.data?.participantList?.filter(item => 
                    parseInt(item.member.memberCode) !== parseInt(e.target.value))
                ]}
            })
        }
    }
    
    
    return (
        <>
            <div className={styles.selectMember}>
                <div>
                    <CheckBox 
                        id={`${departmentCode}member${data.memberCode}`}
                        name={data.memberName}
                        value={data.memberCode}
                        onChange={AttendUsersChangeHanlder} 
                        isChangeColor={true} 
                        style={{width:'0.9rem'}}
                        checked={isChecked}
                    />
                </div>
                <div>
                    <label htmlFor={`${departmentCode}member${data.memberCode}`}>{data.memberName}</label>
                </div>
            </div>
        </>
    )
}