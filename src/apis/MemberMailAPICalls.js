import { GET_MEMBERMAIL } from "../modules/MemberMailModule";
import {PROTOCOL, SERVER_IP, SERVER_PORT} from "./APIConfig";

export const callGetMemberAPI = () => {
    const requestURL = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/mail/selectMember`;

    return async (dispatch, getState) => {

        
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Accept": "*/*",
            }
        })
            .then(response => response.json());

        dispatch({ type: GET_MEMBERMAIL, payload: result });

        console.log("result" , result);

    };
}
