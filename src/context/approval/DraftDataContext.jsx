import React, { createContext, useContext, useState } from 'react';


const DraftDataContext = createContext();

export const useDraftDataContext = () => {
  return useContext(DraftDataContext);
};

export const DraftDataProvider = ({children}) =>{
  const [data, setData] = useState({
    title: '',
    content: '',
    emergency: '',
    refList: [],
    approvalList: [],
    fileList: [],
    existList:[],
    coDept: '',
    startDate: ''
  });

  return (
      <DraftDataContext.Provider value={{data ,setData}}>
        {children}
      </DraftDataContext.Provider>
  );

};