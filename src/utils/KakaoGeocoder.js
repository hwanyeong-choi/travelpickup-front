
class KakaoGeocoder {

    constructor() {
        this.kakaoGeocoder = new kakao.maps.services.Geocoder();
    }


    get instance() {
        return this.kakaoGeocoder;
    }

}

export default new KakaoGeocoder();
