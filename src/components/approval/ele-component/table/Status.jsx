
import style from "./ApprovalTable.module.css";

export default function Status({status}){
  switch (status){
    case 'APPROVAL' :
      return (
          <span className={`${style.status} ${style.done}`}>완료</span>
      );
    case 'WAITING' :
      return (
          <span className={`${style.status} ${style.waiting}`}>진행중</span>
      );
    case 'TEMPORARY' :
      return (
          <span className={`${style.status} ${style.temp}`}>임시저장</span>
      );
    case 'REJECT' :
      return (
          <span className={`${style.status} ${style.reject}`}>반려</span>
      );
  }
}