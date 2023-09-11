import { GET_MEMBERMAIL } from "../modules/MemberMailModule";

export const callGetMemberAPI = () => {
    const requestURL = `http://localhost:8989/mail/selectMember`;

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