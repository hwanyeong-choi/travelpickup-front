import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import axiosClient from "../../utils/AxiosClient.js";
import {useMutation} from "react-query";

function KakaoLoginProcessingPage() {

    const [searchParams] = useSearchParams()
    const {provider} = useParams();
    const code = searchParams.get('code');
    const navigate = useNavigate();

    const {mutate, isLoading, isError, error} = useMutation(
        async  () => {
            const response = await axiosClient.post(`/api/v1/auth/member/${provider}/${code}`);
            return response.data;
        }, {
            onSuccess: (data) => {
                localStorage.setItem('token', data.token);
                navigate('/home')
            },
            onError: (error) => {
                alert('로그인 과정에서 오류가 발생하였습니다.');
                console.error(error);
                navigate('/login')
            }
        }
    )

    useEffect(() => {
        mutate();
    }, []);

    return(<></>)

}


export default KakaoLoginProcessingPage;