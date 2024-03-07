import { Box, Modal } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { setModalState } from "../../../store/ModalLegalReducer";
import '../../../styles/footer/utilities/Legal.scss'

const Legal = () => {

    const { t } = useTranslation();

    const isModalOpen: boolean = useSelector<IRootState, boolean>(state => state.modalLegalReducer.isOpen);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setModalState(false));
    };
    
    return (
        <React.Suspense>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                className="modal-legal"
            >
                <Box className="modal-legal__inner">
                    <div className="container">
                        <div className="paragraph">
                            <h1>{t (`Privacy And Data Protection Policy`)}</h1>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Introduction`)}</p>
                            <p className="paragraph__text">{t (`Welcome to the website www.olegchanov.com (we, our, or us). This Privacy and data protection policy (hereinafter – Privacy Policy, Policy) sets out the basis of your personal data processing.`)}</p>
                            <p className="paragraph__text">{t (`This Privacy Policy is designed to help you understand how we collect, use, disclose, and safeguard your personal information. By using our website (“Website”), you agree to the terms outlined in this Privacy Policy.`)}</p>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Personal data we collect`)}</p>
                            <p className="paragraph__text">{t (`The types of personal data that we may process, for instance, include information about current, past and prospective clients and customers, Website visitors, etc. with whom we deal. This information includes information required to communicate with you, including but not limited to:`)}</p>
                            <ul className="paragraph__list">
                            <li>{t (`Name`)};</li>
                            <li>{t (`Surname`)};</li>
                            <li>{t (`Social media account information (phone number and/or your social media account`)};</li>
                            </ul>
                            <p className="paragraph__text">{t (`The personal data we collect depends on the context of your interactions with us, the choices you make, including your privacy settings, and the service you use.`)}</p>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Purpose of Data Collection`)}</p>
                            <p className="paragraph__text">{t (`We collect your personal information for the following purposes, including but not limited to:`)}</p>
                            <ul className="paragraph__list">
                            <li>{t (`To communicate with you, including responding to your inquiries`)};</li>
                            <li>{t (`To comply with legal and regulatory obligations`)};</li>
                            </ul>
                            <p className="paragraph__text">{t (`Personal data may consist of data kept on paper, computer or other electronic media, all of which is protected under the applicable personal data protection laws.`)}</p>
                            <p className="paragraph__text">{t (`You have a choice when you are asked to provide personal data. You may agree or refuse to provide us with your personal data. You also entitled to make us erase your personal data, cease further dissemination of your personal data and potentially have third parties halt processing of the data. The withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal. However, if you choose not to provide us with your personal data necessary for our services provision or to withdraw the data that is still relevant to original purposes of processing, you may not be able to use our services.`)}</p>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Legal Basis for Processing`)}</p>
                            <p className="paragraph__text">{t (`We process your personal information based on the legal grounds provided by the General Data Protection Regulation (GDPR), including the necessity of processing for the performance of a contract and compliance with legal obligations.`)}</p>
                            <p className="paragraph__text">{t (`All personal data is`)}:</p>
                            <ul className="paragraph__list">
                            <li>{t (`fairly and lawfully processed`)};</li>
                            <li>{t (`processed for a specified purpose`)};</li>
                            <li>{t (`adequate, relevant, and not excessive`)};</li>
                            <li>{t (`not kept for longer than necessary`)};</li>
                            <li>{t (`accurate`)};</li>
                            <li>{t (`secured`)};</li>
                            <li>{t (`not transferred to other countries without adequate protection.`)}</li>
                            </ul>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Data Storage`)}</p>
                            <p className="paragraph__text">{t (`All collected data is stored on servers located within the European Union, ensuring compliance with GDPR requirements.`)}</p>
                            <p className="paragraph__text">{t (`We may transfer your personal data from the European Union to other countries, some of which have not been determined by the European Commission to have an adequate level of data protection. When we do, we use a variety of mechanisms to help ensure your rights and the protection of your personal data.`)}</p>
                            <p className="paragraph__text">{t (`We are retaining your personal data for as long as necessary to provide the services, or for other essential purposes such as complying with our legal obligations, resolving disputes, and enforcing our agreements. Because these needs can vary for different data types in the context of different products, actual retention periods can vary significantly. The criteria used to determine the retention periods include, for instance the period of your personal data processing needed to provide the services.`)}</p>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Data Security`)}</p>
                            <p className="paragraph__text">{t (`We take appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.`)}</p>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Data Sharing`)}</p>
                            <p className="paragraph__text">{t (`We do not sell, trade, or otherwise transfer your personal information to third parties without your explicit consent, except as required by law.`)}</p>
                            <p className="paragraph__text">{t (`We may share information with third parties if the information is required to provide the service you have requested or to contact with you.`)}</p>
                            <p className="paragraph__text">{t (`We reserve the right to disclose your personal data to third parties when required to do so by law to regulatory, law enforcement, or other government authorities.`)}</p>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Restriction of responsibility`)}</p>
                            <p className="paragraph__text">{t (`If at any time you choose to purchase a product or service offered by a third party, any personal data you share with that third party will no longer be controlled under our Privacy Policy. We are not responsible for the privacy policies or the content of sites we link to and have no control of the use or protection of information provided by you or collected by those sites. Whenever you elect to link to a website, you may be asked to provide registration or other information. Please note that the information you are providing is going to a third party, and you should familiarize yourself with the privacy policy provided by that third party.`)}</p>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Your Rights`)}</p>
                            <p className="paragraph__text">{t (`You have the right to`)}:</p>
                            <ul className="paragraph__list">
                                <li>{t (`ask what information we hold about them and why`)};</li>
                                <li>{t (`be informed how to keep it up to date`)};</li>
                                <li>{t (`have inaccurate personal data corrected or removed`)};</li>
                                <li>{t (`to receive the personal data concerning them, which they have previously provided`)};</li>
                                <li>{t (`prevent us from processing information or request that it is stopped if the processing of such data is likely to cause substantial, unwarranted damage or distress to the individual or anyone else, etc.`)};</li>
                                <li>{t (`require us to ensure that no decision which significantly affects an individual is solely based on an automated process for the purposes of evaluating matters relating to him/her, such as to conduct or performance`)};</li>
                                <li>{t (`be informed of what we are doing to comply with our obligations under the applicable data protection laws.`)};</li>
                            </ul>
                            <p className="paragraph__text">{t (`If you cannot access certain information and personal data collected by us, you can always contact us by using email address bfchanoff@gmail. We will respond to requests to access or delete your personal data within 30 (thirty) calendar days.`)}</p>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Cookies and Similar Technologies`)}</p>
                            <p className="paragraph__text">{t (`We may use cookies to enhance the performance of our Website (Cookies are small text files sent from the Web server to your computer.) Cookies used by us do not contain any personal data, nor do they contain account or password information. They merely allow the Website to recognize that a page request comes from someone who has already logged on.`)}</p>
                            <p className="paragraph__text">{t (`To administer and improve our Website, we may use a third party to track and analyze usage and statistical volume information including page requests, form requests, and click paths. The third party may use cookies to track behavior and may set cookies on our behalf. These cookies do not contain any personally identifiable information.`)}</p>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Changes to the Privacy Policy`)}</p>
                            <p className="paragraph__text">{t (`From time to time, we may update this Privacy Policy. In case we change this Privacy Policy materially, the revised Privacy Policy will be posted promptly on our Website. You agree to accept the posting of a revised Privacy Policy electronically on the Website as actual notice to you. We encourage you to check back periodically and review this Policy so that you will always know what personal data we collect, how we use it, and to whom we disclose it. If you have any questions that this statement does not address, please contact us via email bfchanoff@gmail.com`)}</p>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Contact Information`)}</p>
                            <p className="paragraph__text">{t (`For questions or concerns regarding this Privacy Policy, please contact us at bfchanoff@gmail.com.`)}</p>
                        </div>
                        <div className="paragraph">
                            <p className="paragraph__header">{t (`Translation`)}</p>
                            <p className="paragraph__text">{t (`This Privacy Policy has been drawn up in the English language. In case of discrepancies between the English text version and any translation, the English version shall prevail.`)}</p>
                        </div>
                        <button onClick={handleClose}>{t (`Close`)}</button>
                    </div>
                </Box>
            </Modal>
        </React.Suspense>
    );
};

export default Legal; 