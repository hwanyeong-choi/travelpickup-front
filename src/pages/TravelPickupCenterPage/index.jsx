import {
    CenterContaincer,
    CenterInfoTitleDiv,
    CenterPageTitleDiv,
    TravelPickupCenterContainer,
    TravelPickupContainer
} from "./styles.jsx";
import {Button, Fade} from "@mui/material";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import StoreIcon from '@mui/icons-material/Store';
import {useState} from "react";
import {useQuery} from "react-query";
import axiosClient from "../../utils/AxiosClient.js";
import {useNavigate} from "react-router-dom";
import {TRAVEL_PICKUP_PATHS} from "../../constants/routes.js";

function TravelPickupCenterPage() {

    const { data, isLoading, isError, error} = useQuery('pickup-center-List', async () => {
        const response = await axiosClient.get('/api/v1/pickup-centers')
        return response.data;
    }, {
        cacheTime: 0
    })

    const navigate = useNavigate();

    const [selectStore, setSelectStore] = useState({lat: 37.560921, lng: 126.985876})

    const getCenterList = (centerList = []) => {
        return centerList.map((center, index) =>
            <CenterContaincer key={index}
                     onClick={() => selectCenterHandler(center)}>
                    <div style={{margin: 'auto auto auto 0px', display: 'flex', flexDirection: 'column'}}>
                        <div>{center.name}</div>
                        <div style={{fontSize: '11px', color: 'grey'}}>
                            {`${center.address} | ${center.addressDetail}`}
                        </div>
                    </div>
                    <StoreIcon sx={{auto: 'auto 0px auto auto', width: '60px', height: '60px'}}/>
                </CenterContaincer>)
    }

    const selectCenterHandler = (center) => {
        setSelectStore({lat: center.latitude, lng: center.longitude})
    }


    return (
        <TravelPickupContainer>
            <Fade in={true} timeout={1500}>
                <TravelPickupCenterContainer>
                    <CenterPageTitleDiv><h2>TravelPickup</h2></CenterPageTitleDiv>
                    <CenterInfoTitleDiv><h3>픽업 접수센터</h3></CenterInfoTitleDiv>
                    <Map
                        id="map"
                        center={{
                            lat: selectStore.lat,
                            lng: selectStore.lng
                        }}
                        isPanto={false}
                        style={{
                            width: "100%",
                            height: "350px",
                            borderRadius: '15px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                            marginBottom: '30px',
                        }}
                        level={4}
                        draggable={false}>
                        <MapMarker
                            position={{
                                lat: selectStore.lat,
                                lng: selectStore.lng
                            }}
                        />
                    </Map>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: 'space-between',
                        gap: '10px'
                    }}>
                        {getCenterList(data)}
                    </div>
                    <Button
                        sx={{
                            marginTop: '16px',
                            width: '100%',
                            fontFamily: 'jalnan'
                        }}
                        type='submit'
                        variant="contained"
                        size="large"
                        onClick={() => navigate(TRAVEL_PICKUP_PATHS.PICKUPS_HOME)}>
                        목록으로
                    </Button>
                </TravelPickupCenterContainer>
            </Fade>
        </TravelPickupContainer>
    )
}


export default TravelPickupCenterPage;
