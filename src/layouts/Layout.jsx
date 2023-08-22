import { Outlet } from "react-router-dom";
import LoginForm from "../pages/login/LoginForm";

const Layout = () => {
    return (
        <>
        <Outlet />
        <LoginForm/>
        </>
    )
}

export default Layout;