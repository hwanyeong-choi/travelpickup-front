import {
    HomePageSlogan,
    KakaoLoginButton,
    LoginPageContainer,
    TravelPickupContainer,
    TravelPickUpLogo
} from "./styles.jsx";

import kakaoLoginButton from '/src/assets/images/kakao_login_button.png'
import travelPickupLogo from '/src/assets/images/travelpickup_logo.jpg'
import {Fade} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {TRAVEL_PICKUP_LOCAL_STORAGE} from "../../constants/localstorage.js";
import {TRAVEL_PICKUP_PATHS} from "../../constants/routes.js";
function LoginPage() {

    const navigate = useNavigate();

    const handleKakaoLogin = () => {
        window.location.href = 'http://localhost:8080/api/v1/login/kakao'
    }


    useEffect(() => {
        if (localStorage.getItem(TRAVEL_PICKUP_LOCAL_STORAGE.TOKEN)) {
            navigate(TRAVEL_PICKUP_PATHS.PICKUPS_HOME, {replace: true})
            return;
        }
    }, []);

    
    return(<TravelPickupContainer>
        <Fade in={true} timeout={1500}>
            <LoginPageContainer>
                <TravelPickUpLogo src={travelPickupLogo} alt={'logo'}/>
                <HomePageSlogan>
                    짐은 우리가 챙기고<br/>당신은 여행에 집중하세요
                </HomePageSlogan>
                <KakaoLoginButton onClick={() => handleKakaoLogin()} src={kakaoLoginButton} alt={'kakao login'}/>
            </LoginPageContainer>
        </Fade>
    </TravelPickupContainer>);
}

export default LoginPage;
