import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function LoginProtected({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 설정

    return children;
}

export default LoginProtected;
