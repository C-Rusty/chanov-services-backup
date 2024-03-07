import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";

const ModalNotice = () => {

    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const formStatus = useSelector<IRootState, string>((state) => state.formReducer.isSent);
    const [showSucceedText, setShowSucceedText] = useState<boolean>(false);

    useEffect(() => {
        switch (formStatus) { 
            case `ok`:
                setShowSucceedText(true);
                handleOpen();
            break;
            case `error`:
                setShowSucceedText(false);
                handleOpen();
            break;
        
            default: break;
        }
    }, [formStatus]);

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            className="modal"
        >
            <Box className="modal__inner">
                <div className="container">
                    {showSucceedText ?
                        <div className="text">
                            <span>{t (`Thank you!`)}</span>
                            <span>{t (`The form was successfully sent`)}</span>
                            <span>{t (`I will contact you shortly`)}</span>
                        </div>
                        :
                        <div className="text">
                            <span>{t (`Ooops!`)}</span>
                            <span>{t (`Something went wrong...`)}</span>
                            <span>{t (`Please try to send the form again or contact me by social media or email indicated on the website`)}</span>
                        </div>
                    }
                    <button onClick={handleClose}>{t (`Close`)}</button>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalNotice;