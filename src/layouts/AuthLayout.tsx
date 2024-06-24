import useToken from "@/store";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {

    const token = useToken(state => state.token)

    if(token) {
        return <Navigate to={'/dashboard/home'} replace/>
    }

    return (
        <div>
            <Outlet/>
        </div>
    )
};

export default AuthLayout;