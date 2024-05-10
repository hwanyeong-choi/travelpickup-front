import {Box, Button, Modal} from "@mui/material";


function TravelPickupModalOneButton({ showModal,
                                        modalTitle,
                                        message,
                                        buttonTitle,
                                        buttonHandler}) {

    return (<Modal
        open={showModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid whitesmoke',
            borderRadius: '15px',
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
            width: 300,
            textAlign: 'center',
            fontFamily: 'jalnan'
        }}>
            <h2 id="parent-modal-title">{modalTitle}</h2>
            <p id="child-modal-description">{message}</p>
                <Button
                    sx={{
                        marginTop:'30px',
                        width: '60%',
                        fontFamily: 'jalnan'}}
                    variant="contained"
                    size="large"
                    onClick={buttonHandler}>
                    {buttonTitle}
                </Button>
        </Box>
    </Modal>);

}

export default TravelPickupModalOneButton;
