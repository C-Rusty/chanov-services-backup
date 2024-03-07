import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import '../../../styles/main/about-me.scss';
import Loading from "./Loading";

const AboutMe = () => {

    const { t } = useTranslation();

    return(
        <React.Suspense fallback={<Loading/>}>
            <div className="about-me">
                <section className="intro">
                    <div className="container">
                        <a href="/contacts" className="mobile-btn">
                            {t (`Contact me`)}
                        </a>
                        <div className="img-container">
                            <img src="../../../images/content/about-me/oleg-chanov.webp" alt="oleg-chanov" />
                        </div>
                        <div className="text">
                            <div className="text__headline">
                                <h1>{t (`Aleg Chanov`)}</h1>
                                <div className="underline-container">
                                    <div className="underline"></div>
                                </div>
                            </div>
                            <h2 className="text__supporting-headline">{t (`Strategic management consultant`)}</h2>
                            <h3 className="text__description-headline">
                                {t ('Strategy development in offline and online sessions')}
                                {window.innerWidth < 1150 && <br />}
                                {t (`Holding strategic sessions using AI (Artificial Intelligence)`)}   
                            </h3>
                            <Link to="/contacts" className="desktop-btn">
                                {t (`Contact me`)}
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="digits">
                    <div className="container">
                        <h3 className="headline">{t (`In numbers`)}</h3>
                        <div className="cards">
                            <div className="cards__card">
                                <h4 className="card-headline">{t (`Since 2005`)}</h4>
                                <p className="card-text">{t (`in consulting business`)}</p>
                            </div>
                            <div className="cards__card">
                                <h4 className="card-headline">11 {t (`years`)}</h4>
                                <p className="card-text">{t (`in a large automobile holding Volkswagen from an employee to a marketing director`)}</p>
                            </div>
                            <div className="cards__card">
                                <h4 className="card-headline">&gt; 100</h4>
                                <p className="card-text">{t (`of strategies and marketing strategies in various sectors of an economy: road construction, retail, banking, car business, light manufacturing, car engineering, industrial sector etc`)}</p>
                            </div>
                            <div className="cards__card">
                                <h4 className="card-headline">&gt; 70</h4>
                                <p className="card-text">{t (`strategic sessions held`)}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="education">
                    <div className="container">
                        <h3 className="headline">{t (`Education`)}</h3>
                        <div className="text">
                            <div className="svg">
                                <img loading="lazy" src="../../../images/content/about-me/education.svg" alt="education" />
                            </div>
                            <div className="main">
                                <span>{t (`Europa-Universität Viadrina Frankfurt`)}</span>
                                <span>MBA</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="quote">
                    <div className="container">
                        <span className="headline">{t (`The best way to predict the future is to create it...`)}</span>
                        <span className="headline-support">{t (`Peter Drucker`)}</span>
                    </div>
                </section>
                <section className="system">
                    <div className="container">
                        {innerWidth > 991 && 
                            <h3>&laquo;{t ("It's better to have any system than no system at all")}&raquo;</h3>
                        }
                        <div className="quotes">
                            <p>{t ('I believe that ideas move the world. If you look around, you can easily see this')}</p>
                            <p>{t ('I love and know how to help companies and owners build healthy, successful businesses and do something useful for people')}</p>
                            <p>
                                {t ('If you have an idea to build a large successful business, then, in addition to the vision of what it should be, the energy, dedication and good business model necessary for this, you need')}
                                <span className="highlight">
                                    {t ('a system for moving')}
                                </span>
                                {t ('towards your goals and dreams')}
                            </p>
                            <p>
                                {t ('My job is to help the company create a strategy and strategic management system')}
                                <br />
                                {t ('I structure my work in such a way as to take into account the nuances of the company, the specifics of the business and relationships in the team. After all, there are no identical people and identical companies')}
                            </p>
                        </div>
                    </div>
                </section>
                {innerWidth < 991 &&
                    <section className="quote-system">
                        <div className="container">
                            <span className="headline">
                                &laquo;{t ("It's better to have any system than no system at all")}&raquo;
                            </span>
                        </div>
                    </section>
                }
                <section className="approach">
                    <div className="container">
                        <h3>{t ('Approach')}</h3>
                        <div className="main">
                            <div className="main__plan">
                                <div className="item">
                                    <span className="item__number">1</span>
                                    <p className="item__text">{t (`First, it is determined what competencies the company has and what experience it has in strategic planning and management`)}</p>
                                </div>
                                <div className="item">
                                    <span className="item__number">2</span>
                                    <p className="item__text">{t ('An introduction to the company and diagnostics are carried out')}</p>
                                </div>
                                <div className="item">
                                    <span className="item__number">3</span>
                                    <p className="item__text">{t ('Depending on the team’s competencies, it is determined and the strategy development format most suitable for the company is selected')}</p>
                                </div>
                                <div className="item">
                                    <span className="item__number">4</span>
                                    <p className="item__text">{t ('If necessary, the team is trained at the stage of preparation for developing a strategy')}</p>
                                </div>
                                <div className="item">
                                    <span className="item__number">5</span>
                                    <p className="item__text">{t ('A work scenario is created during the strategic session and after it in order for the strategy to be implemented')}</p>
                                </div>
                                <div className="item">
                                    <span className="item__number">6</span>
                                    <p className="item__text">{t ('A strategy is being developed')}</p>
                                </div>
                                <div className="item">
                                    <span className="item__number">7</span>
                                    <p className="item__text">{t ('The strategy is being successfully implemented')}</p>
                                </div>
                            </div>
                            {window.innerWidth > 991 &&
                                <div className="main__img-container">
                                    <img loading="lazy" src="../../../images/content/about-me/approach.webp" alt="my-approach" />
                                </div>
                            }
                        </div>
                    </div>
                </section>
                <section className="credo">
                        <div className="container">
                            <span className="credo-headline">{t (`My credo`)}:</span>
                            <span className="credo-quote">
                                &laquo;{t (`Understand how it works, and then apply it to yourself`)}&raquo;
                            </span>
                        </div>
                </section>
                <section className="benefits">
                    <div className="container">
                        <h3>{t (`What are you getting`)}&#63;</h3>
                        <div className="cards">
                            <div className="cards__card">
                                <p>{t (`Define the company's development vision for the period of strategy development`)}</p>
                            </div>
                            <div className="cards__card">
                                <p>{t (`Identify the pool of most important projects that need to be implemented to achieve your most important goals, and detail them`)}</p>
                            </div>
                            <div className="cards__card">
                                <p>{t (`Determine how your company will develop most successfully and what needs to be done for this`)}</p>
                            </div>
                            <div className="cards__card">
                                <p>{t (`Teach your team to develop a strategy and learn to involve employees in the change process, increase their competencies`)}</p>
                            </div>
                            <div className="cards__card">
                                <p>{t (`Establish a strategy execution control system and mechanisms execution`)}</p>
                            </div>
                            <div className="cards__card">
                                <p>{t (`You will have people responsible for implementing the strategy and key performance indicators`)}</p>
                            </div>
                            <div className="cards__card">
                                <p>{t (`Create the prerequisites for successful implementation of the strategy`)}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bring-benefits">
                    <div className="container">
                        <h3>{t (`How do I bring benefit`)}</h3>
                        <div className="text">
                            <div className="text__column">
                                <p>
                                    {t (`The most impressive result achieved by the client was the fulfillment of`)}
                                    <span className="highlight"> 96% </span>
                                    {t (`of the objectives set in the strategy`)}
                                </p>
                                <p>
                                    {t (`The owners said they have never seen their business be so successful`)}
                                </p>
                            </div>
                            <div className="text__column">
                                <p>
                                    {t (`On average, the implementation of strategic tasks is about`)}
                                    <span className="highlight"> 70% </span>
                                </p>
                                <p>
                                    {t (`Strategies being developed with my participation are effective`)}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="how-achieve">
                    <div className="container">
                        <h3>{t (`How do I achieve this`)}&#63;</h3>
                        <div className="main">
                            <div className="main__img-container">
                                <img loading="lazy" src="../../../images/content/about-me/achieve.webp" alt="achieve-session" />
                            </div>
                            <div className="text">
                                <div className="text__item">
                                    <img loading="lazy" src="../../../images/content/about-me/ticking.svg" alt="achieve" />
                                    <p>
                                        {t (`I myself am the director of strategic management in a rapidly and successfully growing company. I understand`)}
                                        &laquo;{t (`how it works in practice, not in theory`)}&raquo;
                                    </p>
                                </div>
                                <div className="text__item">
                                    <img loading="lazy" src="../../../images/content/about-me/ticking.svg" alt="achieve" />
                                    <p>
                                        {t (`I always do the full cycle work myself. I conduct preliminary consultation, diagnosis, adaptation, or develop an approach that is most effective and applicable for the client`)}
                                    </p>
                                </div>
                                <div className="text__item">
                                    <img loading="lazy" src="../../../images/content/about-me/ticking.svg" alt="achieve" />
                                    <p>
                                        {t (`At each stage of cooperation I provide feedback on the process and the result`)}
                                    </p>
                                </div>
                                <div className="text__item">
                                    <img loading="lazy" src="../../../images/content/about-me/ticking.svg" alt="achieve" />
                                    <p>{t (`I maintain confidentiality of information`)}</p>
                                </div>
                            </div>
                        </div>
                        <a href="/contacts" className="mobile-btn">
                            {t (`Contact me`)}
                        </a>
                    </div>
                </section>
            </div>
        </React.Suspense>
    )
};

export default AboutMe;