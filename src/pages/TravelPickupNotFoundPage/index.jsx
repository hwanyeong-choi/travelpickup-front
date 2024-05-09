import {TravelPickupContainer, TravelPickupNotFoundContainer} from "./styles.jsx";
import {Button, Fade} from "@mui/material";
import DangerousIcon from '@mui/icons-material/Dangerous';
import {useNavigate} from "react-router-dom";
import {TRAVEL_PICKUP_PATHS} from "../../constants/routes.js";

function TravelPickupNotFoundPage() {

    const navigate = useNavigate();

    return (
        <TravelPickupContainer>
            <Fade in={true} timeout={1500}>
                <TravelPickupNotFoundContainer>
                    <DangerousIcon
                        color='error'
                        fontSize='large'
                        sx={{margin: 'auto auto 0px auto'}}/>
                    <div style={{
                        margin: '30px auto 200px auto',
                        textAlign: 'center'}}>
                        <h3>
                            404 NOT FOUND
                        </h3>
                        <p>잘못된 페이지로 접근하였습니다.</p>
                    </div>
                    <Button
                        sx={{
                            width: '38%',
                            fontFamily: 'jalnan',
                            margin: '30px auto auto auto'
                        }}
                        onClick={() => navigate(TRAVEL_PICKUP_PATHS.PICKUPS_HOME)}
                        variant="contained"
                        size="medium">
                        홈으로 이동하기
                    </Button>
                </TravelPickupNotFoundContainer>
            </Fade>
        </TravelPickupContainer>
    )
}

export default TravelPickupNotFoundPage;
