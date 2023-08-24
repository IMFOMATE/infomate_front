import React, {useState} from 'react';
import style from './DocumentSide.module.css';
function DocumentSide() {
  const[ selectedTab, setSelectedTab ] = useState('approval');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
        <>
          <ul className={style.tap}>
            <li onClick={() => handleTabClick('approval')}>
              결재자
            </li>
            <li onClick={() => handleTabClick('reference')}>
              참조자
            </li>
          </ul>
          {/*이것도 컴포넌트로 뜯자 li부분만*/}
          <div className={`${selectedTab === 'approval' ? style.active : style.none}`}>
            <ul className={style.list}>
              <li>
                <div className={style.photo}>
                  <img src="/img/user.jpg" alt=""/>
                </div>
                <div className={style.content}>
                  <span>결재자 이름름</span>
                  <span>팀명</span>
                  <span>완료여부</span>
                  <p>cxcfdfdfdadsfasdffdfsdsdffdasdffffffffffffasdfasdfkhjasdfkjhasfjhasgdfkjahsfkjasfkajsdfhafhfdfd</p>
                </div>
              </li>
              <li>
                <div className={style.photo}>
                  <img src="/img/user.jpg" alt=""/>
                </div>
                <div className={style.content}>
                  <span>결재자 이름름</span>
                  <span>팀명</span>
                  <span>완료여부</span>
                  <p>기안 cxcfdfdfdadsfasdffdfsdsdffdasdffffffffffffasdfasdfkhjasdfkjhasfjhasgdfkjahsfkjasfkajsdfhafhfdfd </p>
                </div>
              </li>
            </ul>
          </div>
          <div className={selectedTab === 'reference' ? style.active : style.none}>
            <ul>
              <li>
                <img src="/img/user.jpg" alt=""/>
                <div>
                  <span>참조자자자자</span>
                  <span>팀명</span>
                  <span>완료여부</span>
                  <p>기안 의견 </p>
                </div>
              </li>
            </ul>
          </div>
        </>
  );
}

export default DocumentSide;