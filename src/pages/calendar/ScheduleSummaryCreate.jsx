import ButtonOutline from '../../components/common/button/ButtonOutline';
import ButtonInline from '../../components/common/button/ButtonInline';
import CheckBox from '../../components/common/input/CheckBox';
import InputEle from '../../components/common/input/Input';
import SelectEle from '../../components/common/select/SelectEle';


import styles from './scheduleSummary.module.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const SecheduleSummaryCreate = ({modal, setModal}) => {

    const dataChangeHanlder = e => {
        console.log(e.target.value);
        setModal({
            ...modal,
            data: {
                [e.target.name] : e.target.value
            }
        })
        console.log(modal);
        
    }
    

    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <span style={{fontSize: 25}}>
                     일정 등록
                    </span>
                    <span className={styles.close}>
                        <ButtonInline value={'X'} onClick={()=>setModal({isModal:false})} />    
                    </span>
               </div>
                <div className={styles.content}>
                    <div className={styles.col2}>
                        
                        <label>일정명</label>
                        <InputEle type={'text'} value={''} />
                    
                        <label>일시</label>    
                        <div>
                            <InputEle type={'datetime-local'} style={{margin:'0 0 1vh 0'}} name='startEvent' value={modal.data.start?.toISOString().slice(0,19)} onChange={dataChangeHanlder}/>
                            <InputEle type={'datetime-local'} name='endEvent' value={modal.data.end?.toISOString().slice(0,19)} onChange={dataChangeHanlder}/>
                            <div style={{height:30, alignSelf: 'center'}}>
                                <CheckBox id="all-day" type="checkbox" name="" isChangeColor={true} style={{display:'inline',position: 'relative', top:'7px'}}/>
                                <label for="all-day" style={{display:'inline',position: 'relative', top: '3px',margin: '5px'}}>종일</label>
                            </div>
                        </div>

                        <label>캘린더</label>
                        <div>
                            <SelectEle style={{width:'100%'}} data={[{text:'1',value:1},{text:'2',value:2}]} />
                        </div>

                        <label for="address">장소</label>
                        <InputEle type={'text'}/>
                        
                        <label for="corp-schedule">전사일정</label>
                        <div style={{textAlign: 'left'}}>
                            <CheckBox id="corp-schedule" type="checkbox" isChangeColor={true} style={{position: 'relative', top:'2px'}} />
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <NavLink to='./regist'>
                            <ButtonOutline value={'상세일정등록'} style={{margin:'5px'}} />
                        </NavLink>
                        <ButtonOutline value={'등록'} style={{margin:'5px'}}  />
                        <ButtonOutline value={'닫기'} isCancel={true} style={{margin:'5px'}} onClick={()=>setModal({isModal:false})} />
                    </div>
                </div>
            </div>
        </>
    )
}
    

export default SecheduleSummaryCreate;