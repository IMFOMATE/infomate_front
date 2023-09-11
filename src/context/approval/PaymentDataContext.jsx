import React, { createContext, useContext, useState } from 'react';


const PaymentDataContext = createContext();

export const usePaymentDataContext = () => {
  return useContext(PaymentDataContext);
}

export const PaymentDataProvider = ({children}) =>{

  const [data, setData] = useState({
    title: '',
    content: '',
    emergency: '',
    refList: [],
    approvalList: [],
    fileList: [],
    existList:[],
    paymentList: [],
  });
  
  /* paymentList는 
  {
    paymentDate:'', 지출날짜
    paymentSort:'',지출종류
    paymentPrice:'', 지출금약
    paymentContent:'', 지출내용
    remarks:'' 비고
  }
  */


  return (
      <PaymentDataContext.Provider value={{data, setData}}>
        {children}
      </PaymentDataContext.Provider>
  );
}

export default PaymentDataContext;