import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setFormSentStatus } from "../../../../store/FormSendReducer";

const ContactForm = () => {

    const { t } = useTranslation();

    const telegram: string = `../../../../images/footer/telegram.svg`;
    const viber: string = `../../../../images/footer/viber.svg`;
    const whatsApp: string = `../../../../images/footer/whats-app.svg`;

    const [selectedMessenger, setSelectedMessenger] = useState<string>(whatsApp);
    const [options, setOptions] = useState<Array<string>>([viber, telegram]);
    const allMessengers: Array<string> = [telegram, viber, whatsApp];

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const nameInput = useRef<HTMLInputElement | null>(null);
    const phoneInput = useRef<HTMLInputElement | null>(null);

    const dispatch = useDispatch();

    const handleOpen = () => {
        if (isOpen) {
            document.querySelector(`.list__options`)?.classList.add(`opened`);
            document.querySelector(`.select__open-btn`)?.classList.add(`arrow-transform`);
        } else {
            document.querySelector(`.list__options`)?.classList.remove(`opened`);
            document.querySelector(`.select__open-btn`)?.classList.remove(`arrow-transform`);
        };
    };

    useEffect(() => {
        handleOpen();
    }, [isOpen]);

    const handleMessengerSelect = (selectedOption: string) => {
        if (selectedOption.includes(`telegram`)) {
            setOptions(allMessengers.filter(messenger => messenger !== selectedOption));
            setSelectedMessenger(telegram);
        } 
        else if (selectedOption.includes(`viber`)) {
            setSelectedMessenger(viber);
            setOptions(allMessengers.filter(messenger => messenger !== selectedOption));
        } 
        else if (selectedOption.includes(`whats-app`)) {
            setSelectedMessenger(whatsApp);
            setOptions(allMessengers.filter(messenger => messenger !== selectedOption));
        };
    };

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const noErrors = handleFormErrors();
        if (!noErrors) {
            dispatch(setFormSentStatus(`error`));
            return;
        };
        dispatch(setFormSentStatus(`ok`));


        const data = {
            service_id: 'service_ms5x63y',
            template_id: 'template_9qfcfhf',
            user_id: '-GnWfbXVoK4IzkfI3',
            template_params: {
                name:  nameInput.current!.value,
                phone: phoneInput.current!.value,
                messenger: selectedMessenger.split(`/`)[6].split(`.`)[0]
            }
        };
        
        fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok && response.status === 200) {
                nameInput.current!.value = ``;
                phoneInput.current!.value = ``;
                dispatch(setFormSentStatus(`ok`));
            } else {
                console.log("error");
            };
        }).catch(error => {
            console.error("Error:", error);
            dispatch(setFormSentStatus(`error`));
        });
    };

    function handleFormErrors () {
        let noErrors: boolean = true;

        const errorTextName = document.getElementById(`error-text-name`);
        const errorTextContacts = document.getElementById(`error-text-contacts`);
        
        if (!nameInput.current?.value) {
            errorTextName?.classList.remove(`hidden`);
            noErrors = false;
        } else if (!phoneInput.current?.value) {
            errorTextContacts?.classList.remove(`hidden`);
            noErrors = false;
        } else if (!nameInput.current?.value && !phoneInput.current?.value) {
            errorTextName?.classList.remove(`hidden`);
            errorTextContacts?.classList.remove(`hidden`);
            noErrors = false;
        };

        return noErrors;
    };

    const checkIsNameEmpty = () => {
        if (!nameInput.current?.value) {
            document.getElementById(`error-text-name`)?.classList.remove(`hidden`);
            document.querySelector(`.name-input`)?.classList.add(`error-border`);
        } else {
            document.getElementById(`error-text-name`)?.classList.add(`hidden`);
            document.querySelector(`.name-input`)?.classList.remove(`error-border`);
        };
    };

    const checkIsPhoneEmpty = () => {
        if (!phoneInput.current?.value) {
            document.getElementById(`error-text-contacts`)?.classList.remove(`hidden`);
            document.querySelector(`.phone__select-container`)?.classList.add(`error-border`);
        } else {
            document.getElementById(`error-text-contacts`)?.classList.add(`hidden`);
            document.querySelector(`.phone__select-container`)?.classList.remove(`error-border`);
        };
    };

    return (
        <div className="form-container">
            <form action="submit" method="post" onSubmit={(e) => submitForm(e)}>
                <label className="name">
                    <input 
                        type="text" 
                        placeholder={t (`Name`) + ` *`}
                        ref={nameInput}
                        onChange={checkIsNameEmpty}
                        className="name-input"
                    />
                    <span className="error-text hidden" id="error-text-name">{t (`Please fill in`)}&nbsp;{t (`your name`)}</span>
                </label>
                <label className="phone">
                    <div className="phone__select-container">
                        <input 
                            type="text"
                            placeholder={t (`Phone No. / Messenger`) + ` *`}
                            ref={phoneInput}
                            onChange={checkIsPhoneEmpty}
                        />
                        <div 
                            className="phone__select-messenger"
                            onClick={() => setIsOpen(previousState => !previousState)}  
                        >
                            <img loading="lazy" 
                                src="../../../images/content/contact-me/arrow.svg" 
                                alt="arrow"
                                className="select__open-btn"
                            />
                            <div className="list">
                                <div className="list__selected">
                                    <img loading="lazy" 
                                        src={selectedMessenger} alt="selectedMessenger" 
                                    />
                                </div>
                                <div className="list__options">
                                    {options.map(option =>
                                        <img loading="lazy" 
                                            src={option}
                                            key={option}
                                            onClick={() => handleMessengerSelect(option)}
                                        />    
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="error-text hidden" id="error-text-contacts">{t (`Please fill in`)}&nbsp;{t (`your contacts`)}</span>
                </label>
                <button 
                    type="submit"
                >{t (`Contact me`)}</button>
            </form>
        </div>
    );
};

export default ContactForm;