export function formatApprovalDate(approvalDate) {
  const date = new Date(approvalDate);
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
}

export function formatStatus(status){
  switch (status){
    case 'APPROVAL' :
      return "완료";
    case 'WAITING' :
      return "진행중";
    case 'TEMPORARY' :
      return "임시저장";
    case 'REJECT' :
      return "반려";
  }
}