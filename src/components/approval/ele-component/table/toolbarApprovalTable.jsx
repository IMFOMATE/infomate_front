import React, {useState} from 'react';
import ApprovalTableCss from "./ApprovalTable.module.css";
import ApprovalTable from "./ApprovalTable";
import {NavLink} from "react-router-dom";

// import ToolBarCss from './Toolbar.module.css';


function ToolbarApprovalTable() {

  const [filter, setFilter] = useState('');

  const filterState = [
    {text: '전체', url:''},
    {text: '완료', url:'APPROVAL'},
    {text: '진행', url:'WAITING'},
    {text: '반려', url:'REJECT'},
    {text: '취소', url:'CANCEL'},
  ];

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.dataset.type;
    setFilter(selectedFilter === filter ? '' : selectedFilter);
  };

  const filterdData = filter === '' ? testinit.docList : testinit.docList.filter((f) => f.status === filter);

  return (
    <div>
      <ul className={ApprovalTableCss.toolbar}>
        {
          filterState.map((value, index) =>
            <li onClick={handleFilterChange} data-type={value.url}>
              {value.text}
            </li>
          )
        }
      </ul>
      <ApprovalTable data={filterdData}/>
    </div>
  );
}

export default ToolbarApprovalTable;

const testinit = {

  docList: [
    {
      no: '111',
      isAlert: true,
      status: 'WAITING',
      docTitle: '테스트 문서입니다.',
      createDate: '2023-08-08',
      writer: '주진선'
    },
    {
      no: '112',
      isAlert: false,
      status: 'WAITING',
      docTitle: '테스트 문서입니다.',
      createDate: '2023-08-08',
      writer: '주진선'
    },

  ],
};