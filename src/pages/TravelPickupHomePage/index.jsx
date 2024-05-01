import axiosClient from "../../utils/AxiosClient.js";
import {useQuery} from "react-query";
import {
    EnrolButton,
    HomePageContainer,
    HomePageTitleDiv, PickupListTitleDiv,
    PickupStateInfoButton,
    PickupStateInfoDateDiv,
    PickupStateInfoDiv
} from "./styles.jsx";

function TravelPickupHomePage() {

    const { data, isLoading, isError, error} = useQuery('user', async () => {
        return  await axiosClient.get('/api/v1/me').data;
    }, {
        cacheTime: 10000
    })
    
    return (<>
        <HomePageContainer>
            <HomePageTitleDiv><h2>Travel Pickup</h2></HomePageTitleDiv>
            <PickupListTitleDiv><h4>픽업 진행 목록</h4></PickupListTitleDiv>
            <PickupStateInfoButton>
                <PickupStateInfoDateDiv>2024. 05. 01</PickupStateInfoDateDiv>
                <PickupStateInfoDiv>픽업 신청완료</PickupStateInfoDiv>
            </PickupStateInfoButton>
            <PickupStateInfoButton>
                <PickupStateInfoDateDiv>2024. 05. 01</PickupStateInfoDateDiv>
                <PickupStateInfoDiv>픽업 접수완료</PickupStateInfoDiv>
            </PickupStateInfoButton>
            <PickupStateInfoButton>
                <PickupStateInfoDateDiv>2024. 05. 01</PickupStateInfoDateDiv>
                <PickupStateInfoDiv>픽업 신청완료</PickupStateInfoDiv>
            </PickupStateInfoButton>
            <PickupListTitleDiv><h4>픽업 완료목록</h4></PickupListTitleDiv>
            <PickupStateInfoButton>
                <PickupStateInfoDateDiv>2024. 05. 01</PickupStateInfoDateDiv>
                <PickupStateInfoDiv>픽업 신청완료</PickupStateInfoDiv>
            </PickupStateInfoButton>
            <PickupStateInfoButton>
                <PickupStateInfoDateDiv>2024. 05. 01</PickupStateInfoDateDiv>
                <PickupStateInfoDiv>픽업 접수완료</PickupStateInfoDiv>
            </PickupStateInfoButton>
            <PickupStateInfoButton>
                <PickupStateInfoDateDiv>2024. 05. 01</PickupStateInfoDateDiv>
                <PickupStateInfoDiv>픽업 신청완료</PickupStateInfoDiv>
            </PickupStateInfoButton>
            <PickupStateInfoButton>
                <PickupStateInfoDateDiv>2024. 05. 01</PickupStateInfoDateDiv>
                <PickupStateInfoDiv>픽업 신청완료</PickupStateInfoDiv>
            </PickupStateInfoButton>
            <PickupStateInfoButton>
                <PickupStateInfoDateDiv>2024. 05. 01</PickupStateInfoDateDiv>
                <PickupStateInfoDiv>픽업 신청완료</PickupStateInfoDiv>
            </PickupStateInfoButton>
            <PickupStateInfoButton>
                <PickupStateInfoDateDiv>2024. 05. 01</PickupStateInfoDateDiv>
                <PickupStateInfoDiv>픽업 신청완료</PickupStateInfoDiv>
            </PickupStateInfoButton>
            <EnrolButton/>
        </HomePageContainer>
    </>);

}

export default TravelPickupHomePage;