import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../utils/AxiosClient.js";
import {useMutation} from "react-query";
import {TravelPickupContainer} from "./styles.jsx";
import {CircularProgress} from "@mui/material";
import {TRAVEL_PICKUP_PATHS} from "../../constants/routes.js";
import {TRAVEL_PICKUP_LOCAL_STORAGE} from "../../constants/localstorage.js";
import TravelPickupModalOneButton from "../../components/TravelPickupModalOneButton/index.jsx";

function KakaoLoginProcessingPage() {

    const [searchParams] = useSearchParams()
    const {provider} = useParams();
    const code = searchParams.get('code');
    const navigate= useNavigate();
    const [showLoginErrorModal, setShowErrorModal] = useState(false);

    const {mutate: loginMutate, isLoading, isError, error} = useMutation(
        async  () => {
            const response = await axiosClient.post(`/api/v1/auth/member/${provider}/${code}`);
            return response.data;
        }, {
            onSuccess: (data) => {

                if (data.token) {
                    localStorage.setItem(TRAVEL_PICKUP_LOCAL_STORAGE.TOKEN, data.token);
                    navigate(TRAVEL_PICKUP_PATHS.PICKUPS_HOME, { replace: true });
                    return;
                }

                setShowErrorModal(true);

            },
            onError: (error) => {
                setShowErrorModal(true);
            }
        }
    )

    useEffect(() => {
        loginMutate();
    }, []);

    return(<TravelPickupContainer>
        <CircularProgress sx={{margin: 'auto'}} />
        <TravelPickupModalOneButton
            showModal={showLoginErrorModal}
            modalTitle={'오류'}
            message={'로그인에서 오류가 발생하였습니다. 다시 로그인해주세요.'}
            buttonTitle={'확인'}
            buttonHandler={() => navigate(TRAVEL_PICKUP_PATHS.LOGIN, {replace: true})}
        />
    </TravelPickupContainer>)

}


export default KakaoLoginProcessingPage;
