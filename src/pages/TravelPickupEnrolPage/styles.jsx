import {styled} from "@stitches/react";

export const KakaoMapContainerDiv = styled('div', {
    marginBottom: '30px',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
})

export const TravelPickupContainer = styled('div', {
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
})

export const EnrolPageContainerDiv = styled('div', {
    display: 'flex',
    width: '414px',
    minHeight: '90vh',
    maxHeight: '90vh',
    padding: '16px',
    margin: 'auto',
    flexDirection: 'column',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
})

export const EnrolPageTitleDiv = styled('div', {
    fontFamily: 'jalnan',
    margin:'16px auto'
})

export const EnrolInfoTitleDiv = styled('div', {
    fontFamily: 'jalnan',
    margin:'16px auto',
    letterSpacing: '6px',
})
