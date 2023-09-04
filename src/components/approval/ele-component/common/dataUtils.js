import Swal from "sweetalert2";

export function formatApprovalDate(approvalDate) {
  const date = new Date(approvalDate);
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
}

export function shortFormatApprovalDate(approvalDate){
  const date = new Date(approvalDate);
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

}


export function diffDate(date1, date2){
  const startDate = new Date(date1).getTime();
  const endDate = new Date(date2).getTime();
  const timeDifference = endDate - startDate;

  return timeDifference / (1000 * 60 * 60 * 24);
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

export const formatNumberWithCommas = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const isValid = (data, checkStartDate= false, checkEndDate=false) => {
  console.log(data.content)
  if (data?.title?.length < 5) {
    return '제목은 5자 이상 작성해주세요.';
  }
  if (checkStartDate && !data?.startDate) {
    return '시행일자를 입력해주세요.';
  }
  if(checkEndDate && !data?.endDate){
    return "종료일을 선택헤주세요";
  }
  if(data?.content?.length < 1) {
    return '내용을 입력해주세요';
  }
  return true;
};

export const isPaymentValid = (data) => {
  if (data?.title?.length < 5) {
    return '제목은 5자 이상 작성해주세요.';
  }
  if(data?.content?.length < 1) {
    return '내용을 입력해주세요';
  }
  if (!isPaymentListValid(data.paymentList) || data.paymentList.length === 0) {
    return '세부사항을 입력해주세요.';
  }
  return true;
};

export const isPaymentListValid = (paymentList) => {
  return paymentList.every(payment => (
      payment.paymentDate !== '' &&
      payment.paymentSort !== '' &&
      payment.paymentPrice !== '' &&
      payment.paymentContent !== ''
  ));
};


export const showValidationAndConfirm = (validationResult, approvalSize, confirmedCallback) => {
  if (typeof validationResult === 'string') {
    // 유효성 검사 실패 시 해당 조건에 맞는 텍스트를 표시
    Swal.fire({
      icon: 'error',
      title: '결재를 상신할 수 없음!',
      text: validationResult,
    });
    return;
  }

  if(approvalSize){
    Swal.fire({
      icon: 'info',
      title: '결재요청',
      text: '결재하시겠습니까??',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니오'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmedCallback();
      }
    });
  }

  if(approvalSize === 0){
    Swal.fire({
      icon: 'warning',
      title: '결재자가 선택되지 않음!',
      text: '결재자를 선택하지 않았습니다, 계속 진행하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니오'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmedCallback(); // 확인되었을 때 콜백 실행
      }
    });
  }

};


export const handleCancel = (callback) => {
  Swal.fire({
    icon: 'warning',
    title: '작업을 취소하시겠습니까?',
    text: '작업을 취소하면 저장된 데이터가 삭제됩니다.',
    showCancelButton: true,
    confirmButtonText: '네',
    cancelButtonText: '아니오'
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    } else {
    }
  });
};

