import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import axiosClient from "../../utils/AxiosClient.js";
import {useMutation} from "react-query";
import {TravelPickupContainer} from "./styles.jsx";
import {CircularProgress} from "@mui/material";
import {TRAVEL_PICKUP_PATHS} from "../../constants/routes.js";

function KakaoLoginProcessingPage() {

    const [searchParams] = useSearchParams()
    const {provider} = useParams();
    const code = searchParams.get('code');
    const navigate= useNavigate();

    const {mutate: loginMutate, isLoading, isError, error} = useMutation(
        async  () => {
            const response = await axiosClient.post(`/api/v1/auth/member/${provider}/${code}`);
            return response.data;
        }, {
            onSuccess: (data) => {
                localStorage.setItem('token', data.token);
                navigate(TRAVEL_PICKUP_PATHS.PICKUPS_HOME, { replace: true });
            },
            onError: (error) => {
                alert('로그인 과정에서 오류가 발생하였습니다.');
                navigate(TRAVEL_PICKUP_PATHS.LOGIN, { replace: true });
            }
        }
    )

    useEffect(() => {
        loginMutate();
    }, []);

    return(<TravelPickupContainer>
        <CircularProgress sx={{margin: 'auto'}} />
    </TravelPickupContainer>)

}


export default KakaoLoginProcessingPage;
