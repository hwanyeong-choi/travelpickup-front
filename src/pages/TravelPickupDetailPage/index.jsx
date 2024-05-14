
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import {Button, CircularProgress, Fade, TextField} from "@mui/material";
import {
    EnrolInfoTitleDiv,
    EnrolPageContainerDiv,
    EnrolPageTitleDiv,
    TravelPickupContainer
} from "./styles.jsx";
import {useMutation, useQuery} from "react-query";
import axiosClient from "../../utils/AxiosClient.js";
import TravelPickupModalTwoButton from "../../components/TravelPickupModalTwoButton/index.jsx";
import {TRAVEL_PICKUP_PATHS} from "../../constants/routes.js";
import QRCode from "qrcode.react";


function TravelPickupDetailPage() {

    const { pickupId} = useParams();

    const navigate = useNavigate();

    const ableCancelState = 'PICKUP_REQUEST_COMPLETED';

    const [showCancelModal, setShowCancelModal] = useState(false);

    const { data, isLoading: isPickupLoading, isError, error} = useQuery('pickup', async () => {
        const response = await axiosClient.get(`/api/v1/pickups/${pickupId}`)
        return response.data;
    }, {
        cacheTime: 0,
        retry: 0,
        onSuccess: (data) => {
        },
        onError: (error) => {
            const responseData = error.response.data;
            console.log('Error type:', responseData.errorType);
            console.log('Error message:', responseData.message);
            alert('잘못된 픽업 id 입니다.')
            navigate(TRAVEL_PICKUP_PATHS.PICKUPS_HOME)
        },
    })

    const { mutate: cancelMuitate, isLoading: cancelIsLoading, isError: cancelIsError, error: cancellError, data: cancelData} = useMutation(
        async () => {
            await axiosClient.delete(`/api/v1/pickups/${pickupId}`)
        }, {
            onSuccess: (cancelData) => {
                navigate(TRAVEL_PICKUP_PATHS.PICKUPS_HOME)
            },
            onError: (cancellError) => {
                const responseData = error.response.data;
                console.log('Error type: ', responseData.errorType)
                console.log('Error message: ', responseData.message)
            }
        }
    )

    const getKakaoMapMarker = () => {
        return <MapMarker
            position={{
                lat: data.destinationLocation.latitude,
                lng: data.destinationLocation.longitude
            }}
        />
    }

    const getProductList = (productList) => {
        return productList.map((product, index) =>
                <div key={index}
                        style={{
                        border: '2px solid whitesmoke',
                        borderRadius: '5px',
                        padding: '10px',
                        fontSize: '14px',
                        fontFamily: 'jalnan',
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%'
                }}>
                    <div style={{ margin: 'auto auto auto 0px'}}>
                        <div>{`물품명: ${product.name}`}</div>
                        <div>{`개수: ${product.quantity}`}</div>
                    </div>
                    <img
                        src={`data:image/*;base64,${product.productImgByBase64}`}
                        alt={`Product Img ${index}`}
                        style={{
                            borderRadius: '5px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                            width: '80px',
                            height: '80px',
                            margin: 'auto 0px auto auto'
                        }}
                    />
                </div>
        )
    }

    const getButtonList = () => {
        if (data.pickup.state === ableCancelState) {
            return (<>
            <Button
                sx={{
                    width: '48%',
                    fontFamily: 'jalnan'
                }}
                variant="contained"
                size="large"
                color='error'
                onClick={() => setShowCancelModal(true)}>
                신청취소
            </Button>
            <Button
                sx={{
                    width: '48%',
                    fontFamily: 'jalnan'
                }}
                type='submit'
                variant="contained"
                size="large"
                onClick={() => navigate(-1)}>
            목록으로
                </Button>
            </>);
        }

        return (
            <Button
                sx={{
                    width: '100%',
                    fontFamily: 'jalnan'
                }}
                type='submit'
                variant="contained"
                size="large"
                onClick={() => navigate(-1)}>
                목록으로
            </Button>
        )
    }

    return (
        <TravelPickupContainer>
            {
                isPickupLoading ? <CircularProgress sx={{margin: 'auto', verticalAlign: 'center'}}/> :
                    <Fade in={true} timeout={1500}>
                        <EnrolPageContainerDiv>
                            <EnrolPageTitleDiv><h2>TravelPickup</h2></EnrolPageTitleDiv>
                            <EnrolInfoTitleDiv><h3>픽업 신청내역</h3></EnrolInfoTitleDiv>
                            <Fade in={true} timeout={2000}>
                                <div style={{display: 'flex', flexDirection: "column"}}>
                                    <div style={{
                                        display: 'flex',
                                        border: '1px solid #dcdcdc',
                                        borderRadius: '5px',
                                        marginBottom: '10px',
                                        padding: '10px'
                                    }}>
                                    <div style={{
                                        fontFamily: 'jalnan',
                                        margin: 'auto'}}>
                                            픽업센터 접수 QR 코드
                                        </div>
                                        <QRCode  style={{
                                            margin: 'auto 0px auto auto',
                                            width: '75px',
                                            height: '75px'}}
                                                 value={JSON.stringify(data.pickup)}/>
                                    </div>
                                    <Map
                                        id="map"
                                        center={{
                                            lat: data.destinationLocation.latitude,
                                            lng: data.destinationLocation.longitude
                                        }}
                                        isPanto={false}
                                        style={{
                                            width: "100%",
                                            height: "350px",
                                            borderRadius: '15px',
                                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                            marginBottom: '30px',}}
                                        level={4}
                                        draggable={false}>
                                        {getKakaoMapMarker()}
                                    </Map>
                                    <TextField
                                        sx={{width: '100%', marginBottom: '16px'}}
                                        required
                                        id="outlined-read-only-input"
                                        label="숙소 주소"
                                        defaultValue={data.destinationLocation.address}
                                        InputProps={{readOnly: true}}
                                    />
                                    <TextField
                                        sx={{width: '100%', marginBottom: '16px'}}
                                        required
                                        id="outlined-read-only-input"
                                        label="숙소 상세주소"
                                        defaultValue={data.destinationLocation.addressDetail}
                                        InputProps={{readOnly: true}}
                                    />
                                    <TextField
                                        sx={{width: '100%', marginBottom: '16px'}}
                                        required
                                        id="outlined-read-only-input"
                                        label="신청일"
                                        defaultValue={data.pickup.createAt}
                                        InputProps={{readOnly: true}}
                                    />
                                    <TextField
                                        sx={{width: '100%', marginBottom: '16px'}}
                                        required
                                        id="outlined-read-only-input"
                                        label="진행상태"
                                        defaultValue={data.pickup.viewState}
                                        InputProps={{readOnly: true}}
                                    />
                                    <EnrolInfoTitleDiv>
                                        <h4>물품 목록</h4>
                                    </EnrolInfoTitleDiv>
                                    <div style={{display: 'flex',
                                        flexDirection:'column',
                                        justifyContent: 'space-between',
                                        gap: '10px'
                                    }}>
                                        {getProductList(data.productList)}
                                    </div>
                                    <div style={{
                                        paddingTop: '30px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        width: '100%'
                                    }}>
                                    {getButtonList()}
                                    </div>
                                    <TravelPickupModalTwoButton
                                        showModal={showCancelModal}
                                        setShowModal={setShowCancelModal}
                                        modalTitle={'취소'}
                                        message={'픽업신청을 취소하시겠습니까?'}
                                        leftButtonTitle={'아니요'}
                                        rightButtonTitle={'네'}
                                        rightButtonHandler={cancelMuitate}/>
                                </div>
                            </Fade>
                        </EnrolPageContainerDiv>
                    </Fade>
            }
        </TravelPickupContainer>
    )
}

export default TravelPickupDetailPage;
