import {useDraftDataContext} from "./approval/DraftDataContext";
import {usePaymentDataContext} from "./approval/PaymentDataContext";
import {useVacationDataContext} from "./approval/VacationDataContext";


export const contextMappings = {
  draft: useDraftDataContext,
  payment: usePaymentDataContext,
  vacation: useVacationDataContext,
  // 다른 컨텍스트들도 여기에 추가
};