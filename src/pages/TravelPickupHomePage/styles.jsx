import {styled} from "@stitches/react";
import {Box, Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add.js";

export const TravelPickupContainer = styled('div', {
    display: 'flex',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    minHeight: '90vh',
    maxHeight: '90vh',
    width: '414px',
    padding: '16px',
})

export const HomePageContainer = styled('div', {
    display: 'flex',
    margin: 'auto',
    minHeight: '90vh',
    maxHeight: '90vh',
    width: '414px',
    flexDirection: 'column',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
})

export const HomePageTitleDiv = styled('div', {
    fontFamily: 'jalnan',
    margin:'16px auto'
})

export const PickupListTitleDiv = styled('div', {
    fontFamily: 'jalnan',
    margin:'16px auto',
    letterSpacing: '6px',
})

export const PickupDiv = styled('div', {
    border: '1.5px solid black',
    margin: '16px auto',
    width: '90%',
    padding: '30px 0px',
    borderRadius: '10px',
    display: 'flex',
    backgroundColor: 'white',
    cursor: 'pointer',
    boxShadow: '0 0 px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
})

export const PickupStateInfoDateDiv = styled('div', {
    fontSize:'11px',
    fontWeight:'800',
    margin: 'auto auto auto 16px'
})

export const PickupStateInfoDiv = styled('div', {
    fontSize: '16px',
    fontWeight: '800',
    margin: 'auto 16px auto auto'
})

export const EnrolButton = ({onClick}) => {
    return <Box sx={{position: 'sticky',
        bottom: 0,
        right: 0,}}>
        <Fab color="primary" aria-label="add"
             sx={{
                 position: 'absolute',
                 bottom: 0,
                 right: 0,
             }}
        onClick={onClick}>
            <AddIcon />
        </Fab>
    </Box>
}
