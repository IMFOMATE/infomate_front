import {PROTOCOL, SERVER_IP, SERVER_PORT} from "./APIConfig";
import axios from "axios";
import {GET_CREDIT} from "../modules/HomeModules";


export const getMainCredit = () => {
  const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/document/credit`;

  return async (dispatch, getState) => {
    const result = await axios.get(requestURL,{headers:{
        "Accept": "*/*",
        "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
      }})
        .then(res => res.data);

    if(result.status === 200)
      dispatch({ type: GET_CREDIT, payload: result });

    }


}