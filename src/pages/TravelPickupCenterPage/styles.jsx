import {styled} from "@stitches/react";

export const TravelPickupContainer = styled('div', {
    display: 'flex',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    minHeight: '90vh',
    maxHeight: '90vh',
    width: '414px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none',
    }
})

export const TravelPickupCenterContainer = styled('div', {
    width: '414px',
    height: '90vh',
    display: 'flex',
    padding: '16px',
    flexDirection: 'column',
})

export const CenterPageTitleDiv = styled('div', {
    fontFamily: 'jalnan',
    margin:'16px auto'
})

export const CenterInfoTitleDiv = styled('div', {
    fontFamily: 'jalnan',
    margin:'16px auto',
    letterSpacing: '6px',
})

export const CenterContaincer = styled('div', {
    border: '2px solid #dcdcdc',
    borderRadius: '7px',
    padding: '10px',
    fontSize: '14px',
    fontFamily: 'jalnan',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    }
})
