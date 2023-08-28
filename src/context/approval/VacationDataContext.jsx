import {createContext, useContext, useState} from "react";

const VacationDataContext = createContext();

export const useVacationDataContext = () => {
  return useContext(VacationDataContext);
};

export const VacationProvider = ({children}) => {

  const [data, setData] = useState({
    title: '',
    content: '',
    emergency: '',
    refList: [],
    approvalList: [],
    fileList: [],
    sort:'연차',
    startDate: '',
    endDate: '',
    reason:''
  });

  return(
      <VacationDataContext.Provider value={{data, setData}}>
        {children}
      </VacationDataContext.Provider>
  );

}