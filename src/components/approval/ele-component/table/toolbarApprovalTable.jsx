import React, {useEffect, useState} from 'react';
import ApprovalTableCss from "./ApprovalTable.module.css";
import ApprovalTable from "./ApprovalTable";

// import ToolBarCss from './Toolbar.module.css';


function ToolbarApprovalTable({documentData}) {

  /*effect이용하긴해야되는데*/

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

  const filteredData = filter === '' ? documentData?.data : documentData?.data.filter((f) => f.status === filter);

  useEffect(() => {
    // dispatch({type: GET_DOCUMENT_APRPROVALLIST,payload:[]})

    setFilter('')
  }, []);


  // useEffect(() => {
  //   if (filter === '') {
  //     setFilter(documentData?.data || []);
  //   } else {
  //     const newData = documentData?.data.filter((item) => item.status === filter);
  //     setFilter(newData);
  //   }
  // }, [filter, documentData]);


  return (
    <div className={ApprovalTableCss.container}>
      <ul className={ApprovalTableCss.toolbar}>
        {
          filterState.map((value, index) =>
            <li
              key={index}
              onClick={handleFilterChange}
              data-type={value.url}
              className={filter === value.url ? ApprovalTableCss.active : ''}
            >
              {value.text}
            </li>
          )
        }
      </ul>
      <ApprovalTable data={filteredData}/>

      {/*페이징*/}
    </div>
  );
}

export default ToolbarApprovalTable;
