import {useForm} from "react-hook-form";
import {
    EnrolInfoTitleDiv,
    EnrolPageContainerDiv,
    EnrolPageTitleDiv,
    KakaoMapContainerDiv,
    TravelPickupContainer
} from "./styles.jsx";
import {Button, Fade, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add.js";
import {Map, MapMarker} from "react-kakao-maps-sdk"
import { useState } from "react";
import kakaoGeocoder from "../../utils/KakaoGeocoder.js";
import {useMutation} from "react-query";
import axiosClient from "../../utils/AxiosClient.js";
import {useNavigate} from "react-router-dom";
import {TRAVEL_PICKUP_PATHS} from "../../constants/routes.js";

function TravelPickupEnrolPage() {



    const navigate = useNavigate();

    const geocoder = kakaoGeocoder.instance;

    const [marker, setMarker] = useState(null);
    const [enrolProductCnt, setEnrolProductCnt] = useState(1);
    const [imageMap, setImageMap] = useState({})

    const [coordinates, setCoordinates] = useState({
        center: {lat: 37.5663174209601, lng: 126.977829174031},
        isPanto: false
    });

    const {
        setValue,
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const { mutate: enrolPickupMutate, isLoding, isError, error, data} = useMutation(
        async (data) => {
            await axiosClient.post('/api/v1/pickups', data)
        },
        {
            onSuccess: (data) => {
                navigate(TRAVEL_PICKUP_PATHS.PICKUPS_COMPLETE)

            },
            onError: (error) => {
                const responseData = error.response.data;
                console.log('Error type: ', responseData.errorType)
                console.log('Error message: ', responseData.message)
            }
        })

    const onSubmit = (data) => {

        const pickupProductList = data.products.map( (pickupProduct) => ( {name: pickupProduct.name, quantity: pickupProduct.quantity}))
        const pickupProductImgFileList = data.products.map(pickupProduct => (pickupProduct.imgFile));

        const pickUpRegisterRequestDto = new Blob([JSON.stringify({
            descriptionLocation: {
                address: data.address,
                addressDetail: data.addressDetail,
                latitude: data.latitude,
                longitude: data.longitude
            },
            pickupProductDtoList: pickupProductList
        })], {
            type: "application/json",
        })

        const formData = new FormData();

        formData.append('pickUpRegisterRequestDto', pickUpRegisterRequestDto)

        pickupProductImgFileList.forEach((file) => {
            const blob = new Blob([file], { type: file.type });
            formData.append('pickupProductsPhotoFiles', blob, file.name);
        });

        enrolPickupMutate(formData)

    }

    const addProduct = () => {

        setEnrolProductCnt(enrolProductCnt + 1)

    }

    const kakaoAddressSearch = () => {
        new daum.Postcode({
            oncomplete: function (data) {
                setValue('address', data.address)
                geocoder.addressSearch(data.address, kakaoMapAddressSearch)
            }
        }).open();
    }

    const kakaoMapAddressSearch = (result, status) => {
        setValue('latitude', result[0].y)
        setValue('longitude', result[0].x)
        setCoordinates({center: {lat: result[0].y, lng: result[0].x}, isPanto: true})
        setMarker({lat: result[0].y, lng: result[0].x})
    }

    const getKakaoMapMarker = () => {
        return marker ? <MapMarker
            position={{
                lat: marker.lat,
                lng: marker.lng,
            }}
        /> : <></>
    }

    const handleProductImageChange = (event, index) => {
        const productImage = event.target.files[0];

        if (productImage) {
            setImageMap({...imageMap, [index]: URL.createObjectURL(productImage)});
            setValue(`products.${index}.imgFile`, productImage);
        }
    }

    const getProductImage = (index) => {
        return imageMap[index] ? <label style={{cursor: 'pointer'}}>
                <img
                    src={imageMap[index]}
                    alt={`Product Img ${index}`}
                    style={{
                        borderRadius: '16px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                        width: '100%',
                        height: '350px',
                        marginBottom: '16px'
                    }}
                />
                <input
                    {...register(`products.${index}.imgFile`, {
                        onChange: (event) => handleProductImageChange(event, index)
                    })}
                    type={"file"}
                    accept='image/*'

                    style={{display: 'none'}}/>
            </label> :
            <label
                style={{
                    background: 'whitesmoke',
                    width: '100%',
                    height: '350px',
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '16px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                    cursor: 'pointer'
                }}>
                <AddIcon sx={{margin: 'auto auto 16px auto'}}/>
                <div style={{
                    margin: '0px auto auto auto',
                    fontFamily: 'jalnan'
                }}>물품 사진을 추가해 주세요.
                </div>
                <input
                    {...register(`products.${index}.imgFile`, {
                        onChange: (event) => handleProductImageChange(event, index)
                    })}
                    type={"file"}
                    accept='image/*'
                    onChange={(event) => handleProductImageChange(event, index)}
                    style={{display: 'none'}}/>
            </label>
    }

    const getProductEnrolList = () => {
        return Array.from({length: enrolProductCnt}, (_, i) => i)
            .map(index => {
                return (<div key={index}
                             style={{
                                 paddingTop: '30px',
                                 borderTop: '2px solid whitesmoke',
                                 display: 'flex',
                                 flexDirection: "column"
                             }}>
                        {getProductImage(index)}
                    <div style={{display: 'flex', marginBottom: '16px'}}>
                        <TextField
                            {...register(`products.${index}.name`)}
                            sx={{width: '75%'}}
                            required
                            id="outlined-required"
                            label='물품명'
                            placeholder='물품명을 입력해 주세요.'
                        />
                        <TextField
                            {...register(`products.${index}.quantity`)}
                            sx={{width: '20%', marginLeft: 'auto'}}
                            id="outlined-number"
                            label="개수"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}/>
                    </div>
                </div>
            )})
    }

    return (
        <TravelPickupContainer>
            <Fade in={true} timeout={1500}>
                <EnrolPageContainerDiv>
                    <EnrolPageTitleDiv><h2>TravelPickup</h2></EnrolPageTitleDiv>
                    <EnrolInfoTitleDiv><h3>픽업 신청</h3></EnrolInfoTitleDiv>
                    <Fade in={true} timeout={2000}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <KakaoMapContainerDiv>
                                <Map
                                    id="map"
                                    center={coordinates.center}
                                    isPanto={coordinates.isPanto}
                                    style={{width: "100%", height: "350px"}}
                                    level={4}
                                    draggable={false}>
                                    {getKakaoMapMarker()}
                                </Map>
                            </KakaoMapContainerDiv>
                            <TextField
                                {...register("address")}
                                onClick={kakaoAddressSearch}
                                sx={{width: '100%', marginBottom: '16px'}}
                                required
                                id="outlined-read-only-input"
                                defaultValue='숙소위치 검색'
                                label="숙소 위치"
                                InputProps={{readOnly: true}}
                            />
                            <input {...register('latitude')} type='text' style={{visibility: 'hidden'}}/>
                            <input {...register('longitude')} type='text' style={{visibility: 'hidden'}}/>
                            <TextField
                                {...register("addressDetail")}
                                sx={{width: '100%', marginBottom: '16px'}}
                                required
                                id="outlined-read-only-input"
                                placeholder={'숙소 상세주소 입력 예시: 3005호'}
                                label="숙소 상세주소"
                            />
                            {getProductEnrolList()}
                            <Button sx={{
                                width: '100%',
                                fontFamily: 'jalnan'
                            }}
                                    variant="contained"
                                    size='large'
                                    startIcon={<AddIcon/>}
                                    onClick={addProduct}>
                                물품 추가하기
                            </Button>
                            <div style={{
                                paddingTop: '30px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}>
                                <Button
                                    sx={{
                                        width: '48%',
                                        fontFamily: 'jalnan'
                                    }}
                                    variant="contained"
                                    size="large"
                                    color='error'>
                                    신청 취소
                                </Button>
                                <Button
                                    sx={{
                                        width: '48%',
                                        fontFamily: 'jalnan'
                                    }}
                                    type='submit'
                                    variant="contained"
                                    size="large">
                                    신청하기
                                </Button>
                            </div>
                        </form>
                    </Fade>
                </EnrolPageContainerDiv>
            </Fade>
        </TravelPickupContainer>
    )

}

export default TravelPickupEnrolPage
