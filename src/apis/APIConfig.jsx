export const SERVER_IP = process.env.REACT_APP_SPRINGBOOT_SERVER_IP;
export const SERVER_PORT = process.env.REACT_APP_SPRINGBOOT_SERVER_PORT;
export const PROTOCOL = process.env.REACT_APP_SPRINGBOOT_SERVER_PROTOCOL;
export const MEMBER_CODE = parseInt(process.env.REACT_APP_TEST_MEMBER_CODE);
export const DEPARTMENT_CODE = parseInt(process.env.REACT_APP_TEST_DEPARTMENT_CODE);

export const Pageable = ({page, size, sortId, sortDirection}) => {
    console.log(page,size,sortId,sortDirection);
    if(sortId && !sortDirection || !sortId && sortDirection) 
        return console.log(`sortId : ${sortId}, sortDirection : ${sortDirection} 존재 하지 않는 값이 있습니다.`);
    const pageOption = `page=${page}&size=${size}`
    const sort = (sortId && sortDirection) && `sort=${sortId},${sortDirection}`;
    return {pageOption: pageOption, sort: sort}
}