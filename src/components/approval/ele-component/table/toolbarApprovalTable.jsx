import React from 'react';
import ApprovalTableCss from "./ApprovalTable.module.css";
import ApprovalTable from "./ApprovalTable";
import {useNavigate} from "react-router-dom";



function ToolbarApprovalTable({documentData, pageHandler, title, filter}) {

  const navigate = useNavigate();
  const pageInfo = documentData.pageInfo;
  const documents = documentData.data;

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.dataset.type;
    if(title === '기안문서'){
      navigate(`/approval/mylist?status=${selectedFilter}&page=${pageInfo.cri.pageNum-1}`);
    }else if(title === '참조문서'){
      navigate(`/approval/reflist?status=${selectedFilter}&page=${pageInfo.cri.pageNum-1}`);
    }
  };

  const pageNumber = [];

  if(pageInfo){
    for(let i = 1; i <= pageInfo.pageEnd ; i++){
      pageNumber.push(i);
    }
  }


  return (
    <div className={ApprovalTableCss.container}>
      <ul className={ApprovalTableCss.toolbar}>
        {
          title !== '결재대기문서' && title !== '임시저장문서' ?

          filterState.map((value, index) =>
            <li
              key={index}
              onClick={handleFilterChange}
              data-type={value.url}
              className={filter === value.url ?ApprovalTableCss.active : ''}
            >
              {value.text}
            </li>
          ) : ''
        }
      </ul>
      <ApprovalTable data={documents}/>
      <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
        { Array.isArray(documents) &&
            <button
                onClick={() => navigate()}
                disabled={pageInfo.cri.pageNum === 1}
            >
              &lt;
            </button>
        }
        {pageNumber.map((num) => (
            <li key={num} onClick={() => pageHandler(num)}>
              <button
                  style={ pageInfo.cri.pageNum === num ? {backgroundColor : 'orange' } : null}
              >
                {num}
              </button>
            </li>
        ))}
        { Array.isArray(documents) &&
            <button
                // className={ ReviewCSS.pagingBtn }
                onClick={() => pageHandler(pageInfo.cri.pageNum + 1)}
                disabled={pageInfo.cri.pageNum === pageInfo.pageEnd || pageInfo.total === 0}
            >
              &gt;
            </button>
        }
      </div>
    </div>
  );
}

const filterState = [
  {text: '전체', url:''},
  {text: '완료', url:'APPROVAL'},
  {text: '진행', url:'WAITING'},
  {text: '반려', url:'REJECT'},
  {text: '취소', url:'CANCEL'},
];


export default ToolbarApprovalTable;
