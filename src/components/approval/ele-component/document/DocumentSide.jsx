import React, {useState} from 'react';
import style from './DocumentSide.module.css';
import DocumentSideList from "./DocumentSideList";
function DocumentSide({approval, reference}) {
  const[ selectedTab, setSelectedTab ] = useState('approval');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
        <>
          <div className={style.side_wrapper}>
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
                      {
                          approval.map((list, index) => <DocumentSideList key={index} data={list}/>)
                      }
                  </ul>
              </div>
              <div className={selectedTab === 'reference' ? style.active : style.none}>
                  <ul className={style.list}>
                      {
                          reference.map((list, index) => <DocumentSideList key={index} data={list}/>)
                      }
                  </ul>
              </div>
          </div>
        </>
  );
}

export default DocumentSide;