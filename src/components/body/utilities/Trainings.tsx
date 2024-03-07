import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import '../../../styles/main/trainings.scss';
import Loading from "./Loading";

const Trainings = () => {

    const { t } = useTranslation();

    return(
        <React.Suspense fallback={<Loading/>}>
            <div className="trainings-list">
                <section className="mba-trainings">
                    <div className="mba-trainings__description">
                        <div className="container">
                            <div className="content">
                                <h2>
                                    {t (`Course`)}
                                    &#160;
                                    &laquo;{t (`Marketing in MBA format`)}&raquo;
                                </h2>
                                {window.innerWidth < 1151 &&
                                    <div className="img-container-mobile">
                                        <img loading="lazy" src={'../../../images/content/trainings/introImg.webp'} alt="intro-img" />
                                    </div>
                                }
                                <p className="aim-text">
                                    {t (`Aimed at improving the team’s management competencies in marketing and mastering modern marketing technologies`)}
                                </p>
                                <div className="info-col">
                                    <div className="info-col__item">
                                        <p>
                                            {t (`Long-term`)},
                                            <br />
                                            &#160;4-6 &#160;
                                            {t (`months`)}
                                        </p>
                                        <p>
                                            48-72 &#160;
                                            {t (`hours`)}
                                        </p>
                                    </div>
                                    <div className="info-col__item">
                                        <p>
                                            {t (`Adapts to client needs`)}
                                        </p>
                                        <p>
                                            Online/Offline
                                        </p>
                                    </div>
                                </div>
                                <a href="/contacts">{t (`Contact me`)}</a>
                            </div>
                            {window.innerWidth >= 1151 &&
                                <div className="img-container-desktop">
                                    <img loading="lazy" src={'../../../images/content/trainings/introImg.webp'} alt="intro-img" />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="mba-trainings__when-needed">
                        <div className="container">
                            <div className="card">
                                <p>{t (`It is needed when the company has the task of creating a personnel reserve or increasing management competencies and the performance of managers`)}</p>
                            </div>
                            <div className="card">
                                <p>{t (`Listeners can be either mid-level employees, heads of departments and businesses`)}</p>
                            </div>
                            <div className="card">
                                <p>{t (`It is often an integral part of a corporate MBA (as a rule, a corporate MBA includes courses on management,finance and marketing)`)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mba-trainings__clients">
                        <div className="container">
                            <div className="headline">
                                <h3>{t (`Relevant clients`)}</h3>
                                <h4>({t (`employees and managers who attended this course`)})</h4>
                            </div>
                            <div className="client-items">
                                <div className="client-items__item">
                                    <h5>{t (`Automobile holding Atlant-M`)}</h5>
                                    <span className="country">
                                        {t (`operates in 3 countries`)}
                                    </span>
                                </div>
                                <div className="client-items__item">
                                    <h5>{t (`Manufacturing company Alutech`)}</h5>
                                    <span className="country">
                                        {t (`operates in more than 50 countries`)}
                                    </span>
                                </div>
                                <div className="client-items__item">
                                    <h5>{t (`Business school XXI century`)}</h5>
                                    <span className="country">
                                        {t (`Open type MBA - for owners and top managers`)}
                                    </span>
                                </div>
                                <div className="client-items__item">
                                    <h5>
                                        {t (`DIY chain of stores`)} 
                                        <span> &laquo;OMA&raquo;</span>
                                    </h5>
                                    <span className="country">BY</span>
                                </div>
                                <div className="client-items__item">
                                    <h5>
                                        {t (`Automobile holding`)} 
                                        <span> &laquo;Aster&raquo;</span>
                                    </h5>
                                    <span className="country">KZ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mba-trainings__result">
                        <div 
                            className="container"
                        >
                            <div className="result-inner">
                                <h3>{t (`Result`)}</h3>
                                <div className="in-detail">
                                    <p>{t (`Employees will master modern and classical marketing management methodologies`)}</p>
                                    <p>{t (`Employees will learn to use marketing tools in practical activities as applied to their company`)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cjm">
                    <div className="cjm__description">
                        <div className="container">
                            <div className="content">
                                <h2>
                                    {t (`Training`)} Customer Journey Map
                                </h2>
                                {window.innerWidth < 1151 &&
                                <div className="img-container-mobile">
                                    <img loading="lazy" src={'../../../images/content/trainings/cjm.webp'} alt="intro-img" />
                                </div>
                            }
                                <p className="aim-text">
                                    {t (`Aimed at increasing sales through a better understanding of customer behavior`)}
                                </p>
                                <div className="info-col">
                                    <div className="info-col__item">
                                        <p>
                                            48-72 &#160; {t (`hours`)}
                                        </p>
                                        <p>
                                            Online/Offline
                                        </p>
                                    </div>
                                </div>
                                <a href="/contacts">{t (`Contact me`)}</a>
                            </div>
                            {window.innerWidth >= 1151 &&
                                <div className="img-container-desktop">
                                    <img loading="lazy" src={'../../../images/content/trainings/cjm.webp'} alt="intro-img" />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="cjm__info">
                        <div className="container">
                            <p className="card">{t  (`CJM (Customer Journey Map or customer journey map) is a tool for strategic sales management through a better understanding of customer needs and mechanisms of interaction with them`)}</p>
                            <p className="card">{t  (`CJM is a technology that all leading companies use to improve customer service and, accordingly, increase the income received from customers`)}</p>
                        </div>
                    </div>
                    <div className="cjm__result">
                        <div 
                            className="container"
                        >
                            <div className="result-inner">
                                <h3>{t (`Result`)}</h3>
                                <div className="in-detail">
                                    <p>{t (`You will learn to compile CJM in accordance with international best practices`)}</p>
                                    <p>{t (`You will learn to understand which points of interaction and points of contact between your company and the client need to be improved in order to increase the effectiveness of interaction with the client`)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Suspense>
    )
};

export default Trainings;