import {Box, Button, Modal} from "@mui/material";
import {useState} from "react";


function TravelPickupModal({ showModal,
                               setShowModal,
                               modalTitle,
                               message,
                               leftButtonTitle,
                               rightButtonTitle,
                               rightButtonHandler }) {

    const closeModalHandler = () => setShowModal(false);


    return (<Modal
        open={showModal}
        onClose={() => {closeModalHandler}}
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
            <div style={{
                paddingTop: '30px',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <Button
                    sx={{width: '48%',
                        fontFamily: 'jalnan'}}
                    variant="contained"
                    color='error'
                    size="large"
                    onClick={closeModalHandler}>
                    {leftButtonTitle}
                </Button>
                <Button
                    sx={{width: '48%',
                        fontFamily: 'jalnan'}}
                    type='submit'
                    variant="contained"
                    size="large"
                    onClick={rightButtonHandler}>
                    {rightButtonTitle}
                </Button>
            </div>
        </Box>
    </Modal>);

}

export default TravelPickupModal;
