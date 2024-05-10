import {Navigate, Outlet, useLocation} from "react-router-dom";
import {TRAVEL_PICKUP_PATHS} from "../../constants/routes.js";
import {TRAVEL_PICKUP_LOCAL_STORAGE} from "../../constants/localstorage.js";

function AuthProtected() {
    const currentLocation = useLocation();
    const token = localStorage.getItem(TRAVEL_PICKUP_LOCAL_STORAGE.TOKEN);
    return  token ? <Outlet/> : <Navigate to={TRAVEL_PICKUP_PATHS.LOGIN} replace={true} state={{redirectedFrom: currentLocation}}/>
}

export default AuthProtected;
