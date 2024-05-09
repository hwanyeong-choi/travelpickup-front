import {TravelPickupCompleteContainer, TravelPickupContainer} from "./styles.jsx";
import {Button, Fade} from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import {useNavigate} from "react-router-dom";
import {TRAVEL_PICKUP_PATHS} from "../../constants/routes.js";

function TravelPickupCompletePage() {

    const navigate = useNavigate();

    return (
        <TravelPickupContainer>
            <Fade in={true} timeout={1500}>
                <TravelPickupCompleteContainer>
                    <VerifiedIcon
                        color='success'
                        fontSize='large'
                        sx={{margin: 'auto auto 0px auto'}}/>
                    <div style={{margin: '30px auto 200px auto'}}>
                        <h3>
                            픽업 신청 완료
                        </h3>
                    </div>
                    <Button
                        sx={{
                            width: '38%',
                            fontFamily: 'jalnan',
                            margin: '30px auto auto auto'
                        }}
                        onClick={() => navigate(TRAVEL_PICKUP_PATHS.PICKUPS_HOME)}
                        variant="contained"
                        color='success'
                        size="medium">
                        확인
                    </Button>
                </TravelPickupCompleteContainer>
            </Fade>
        </TravelPickupContainer>
    )

}

export default TravelPickupCompletePage;
