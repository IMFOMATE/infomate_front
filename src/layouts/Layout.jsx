import { Outlet } from "react-router-dom";
import Work from "../pages/work/Work";
import Board from "../pages/board/Notice";


const Layout = () => {
    return (
        <>
        <Outlet />
        </>
    )
}

export default Layout;