import Swal from "sweetalert2";

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

export const isValid = (data) => {
  if (data?.title?.length < 5) {
    return '제목은 5자 이상 작성해주세요.';
  }
  if (!data?.startDate) {
    return '시행일자를 입력해주세요.';
  }
  return true;
};



export const showValidationAndConfirm = (validationResult, confirmationMessage, confirmedCallback) => {
  if (typeof validationResult === 'string') {
    // 유효성 검사 실패 시 해당 조건에 맞는 텍스트를 표시
    Swal.fire({
      icon: 'error',
      title: '결재를 상신할 수 없음!',
      text: validationResult,
    });
    return;
  }

  Swal.fire({
    icon: 'warning',
    title: '결재자가 선택되지 않음!',
    text: confirmationMessage,
    showCancelButton: true,
    confirmButtonText: '네',
    cancelButtonText: '아니오'
  }).then((result) => {
    if (result.isConfirmed) {
      confirmedCallback(); // 확인되었을 때 콜백 실행
    }
  });
};
