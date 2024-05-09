import axiosClient from "../../utils/AxiosClient.js";
import {useQuery} from "react-query";
import {
    EnrolButton,
    HomePageContainer,
    HomePageTitleDiv, PickupListTitleDiv,
    PickupDiv,
    PickupStateInfoDateDiv,
    TravelPickupContainer, PickupStateInfoDiv
} from "./styles.jsx";
import {useNavigate, useNavigation} from "react-router-dom";
import {CircularProgress, Fade} from "@mui/material";

function TravelPickupHomePage() {

    const navigate = useNavigate()

    const { data, isLoading, isError, error} = useQuery('pickupList', async () => {
        const response = await axiosClient.get('/api/v1/pickups')
        return response.data;
    }, {
        cacheTime: 0
    })

    const handlerPickupDetailButton = (pickupId) => {
        navigate(`/pickups/${pickupId}`)
    }

    const getPickupList = (pickupList) => {

        if (pickupList.length !== 0) {
            return pickupList.map((pickup, index) => (
            <PickupDiv key={index} onClick={() => {handlerPickupDetailButton(pickup.id)}}>
                <PickupStateInfoDateDiv>{pickup.createAt}</PickupStateInfoDateDiv>
                <PickupStateInfoDiv>{pickup.viewState}</PickupStateInfoDiv>
            </PickupDiv>))
        }

        return <div style={{fontFamily: 'jalnan', width: '80%', height:'40%', margin: '30px auto', textAlign: 'center'}}>
            픽업 목록이 존재하지 않습니다.
        </div>
    }

    return (<TravelPickupContainer>
        {
            isLoading ? <CircularProgress sx={{margin: 'auto', verticalAlign: 'center'}} /> :
                <Fade in={true} timeout={1500}>
                    <HomePageContainer>
                        <HomePageTitleDiv><h2>Travel Pickup</h2></HomePageTitleDiv>
                        <PickupListTitleDiv><h4>픽업 진행 목록</h4></PickupListTitleDiv>
                        {getPickupList(data.inProgressPickupList)}
                        <PickupListTitleDiv><h4>픽업 완료목록</h4></PickupListTitleDiv>
                        {getPickupList(data.finishPickupList)}
                    </HomePageContainer>
                </Fade>
        }
        <EnrolButton onClick={() => {navigate('/enrol')}}/>
    </TravelPickupContainer>);

}

export default TravelPickupHomePage;
