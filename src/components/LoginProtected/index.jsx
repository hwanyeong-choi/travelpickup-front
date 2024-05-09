import {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {TRAVEL_PICKUP_PATHS} from "../../constants/routes.js";

function LoginProtected() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate(TRAVEL_PICKUP_PATHS.LOGIN);
        }
    }, []);

    return  localStorage.getItem('token') ? <Outlet/> : <></>
}

export default LoginProtected;
