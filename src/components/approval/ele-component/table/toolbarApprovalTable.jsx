import React from 'react';
import ApprovalTableCss from "./ApprovalTable.module.css";
import ApprovalTable from "./ApprovalTable";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import Pagenation from "../common/Pagenation";
import SelectEle from "../../../common/select/SelectEle";



function ToolbarApprovalTable({documentData, pageHandler, filter}) {

  const [searchParams, setSearchParams] = useSearchParams();
  const {pathname} = useLocation()
  const path = pathname.split("/")[2];

  const pageInfo = documentData?.pageInfo;
  const documents = documentData?.data;

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.dataset.type;
    searchParams.set("status", selectedFilter);
    setSearchParams(searchParams);
  };


  const handleSizeChange = (e) => {
    searchParams.set("size", e.target.value);
    setSearchParams(searchParams);
  };




  return (
    <div className={ApprovalTableCss.container}>
      <div className={ApprovalTableCss.toolbar_wrap}>
        <ul className={ApprovalTableCss.toolbar}>
          {
            path === 'temporary' || path === 'credit' || path === 'dept'? ''
                :
                filterState.map((value, index) =>
                    <li
                        key={index}
                        onClick={handleFilterChange}
                        data-type={value.url}
                        className={filter === value.url ?ApprovalTableCss.active : ''}
                    >
                      {value.text}
                    </li>
                )
          }
        </ul>
        <div>
          <SelectEle
              defaultValue={20}
              options={[
                {id:1, value:10, text:10},
                {id:2, value:20, text:20},
                {id:3, value:30, text:30},
                {id:4, value:50, text:50},
              ]}
              onClick={handleSizeChange}
          />
        </div>
      </div>

      <ApprovalTable data={documents}/>
      <Pagenation pageInfo={pageInfo} onPageChange={pageHandler} />
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
