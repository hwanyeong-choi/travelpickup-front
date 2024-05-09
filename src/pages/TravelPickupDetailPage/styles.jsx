import {styled} from "@stitches/react";

export const TravelPickupContainer = styled('div', {
    display: 'flex',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    minHeight: '90vh',
    maxHeight: '90vh',
    width: '414px',
})

export const EnrolPageContainerDiv = styled('div', {
    display: 'flex',
    margin: 'auto',
    minHeight: '90vh',
    maxHeight: '90vh',
    padding: '16px',
    width: '414px',
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
