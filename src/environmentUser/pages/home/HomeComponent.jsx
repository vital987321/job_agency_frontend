import commentsIcon from "../../../assets/svg/comments.svg";
import targetIcon from "../../../assets/svg/target.svg";
import teamSupportIcon from "../../../assets/svg/team_support.svg";
import studyIcon from "../../../assets/svg/study.svg";
import bagIcon from "../../../assets/svg/bag.svg";
import phonemanIcon from "../../../assets/svg/phoneman.svg";
import kofolaIcon from "../../../assets/svg/1200px-Kofola_logo 1.svg";
import lidlIcon from "../../../assets/svg/Lidl_logo 1.svg";
import kauflandIcon from "../../../assets/svg/KL_standard_pos_frei_S_sRGB 1.svg";
import ceskaPostaIcon from "../../../assets/svg/cp-sponzoring-sirka-rgb 1.svg";
import searchIcon from "../../../assets/svg/search.svg";
import { ListVacanciesComponent } from "../vacancies/context/ListVacanciesComponent.jsx";
import { LIST_VACANCIES_BASE_URL } from "../../../data/constants.js";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "../../../css/home.css";
import React, { useState, useEffect } from "react";

const quickSearchRef = React.createRef();

export const HomeComponent = () => {
  const listVacanciesRequestUrl = LIST_VACANCIES_BASE_URL + "?limit=8";
  const navigate = useNavigate();

  const quickSearchHandler = (e) => {
    e.preventDefault();
    if (quickSearchRef.current.value) {
      navigate(
        "/vacancies?key_search=" +
          encodeURIComponent(quickSearchRef.current.value)
      );
    }
  };

  return (
    <>
      <section className="introductory-section">
        <div className="introductory-text-container">
          <h2 className="introductory-section-header h2-common">
            We will find the best employment for you
          </h2>
          <p className="introductory-section-text">
            Employment agency of the year 2023
          </p>
        </div>
        <div className="introductory-form-container">
          <form className="introductory-form" onSubmit={quickSearchHandler}>
            <img className="introductory-search-icon" src={searchIcon} alt="" />
            <input
              className="introductory-form-input"
              type="text"
              placeholder="Search"
              ref={quickSearchRef}
            />
            {/* <input type="submit" value='Search' /> */}
          </form>
        </div>
      </section>

      <section className="statistics-container">
        <div className="statistics-subcontainer">
          <div className="statistics-impressive-text">124</div>
          <div className="statistics-plain-text">Companies in cooperation</div>
        </div>
        <div className="statistics-subcontainer">
          <div className="statistics-impressive-text">3850</div>
          <div className="statistics-plain-text">Successful employments</div>
        </div>
        <div className="statistics-subcontainer">
          <div className="statistics-impressive-text">5000</div>
          <div className="statistics-plain-text">
            Vacancies available for our clients
          </div>
        </div>
        <div className="statistics-subcontainer">
          <div className="statistics-impressive-text">84%</div>
          <div className="statistics-plain-text">
            Of our clients found a job within one week
          </div>
        </div>
      </section>

      <section className="our-service-section">
        <h2 className="home-h2 h2-common">Our services</h2>
        <ul className="our-service-container">
          <li className="our-service-subcontainer">
            <div className="our-service-subheader">
              <div className="our-service-subheader-icon">
                <img src={commentsIcon} alt="icon" />
              </div>
              <div className="our-service-subheader-text">
                <h4>Consultations on employment</h4>
              </div>
            </div>
            <div className="our-service-subcontainer-text">
              Our experts will help you to develop employment search strategy,
              to prepare CV, to prepare for the interview and to get over
              language barrier.
            </div>
          </li>

          <li className="our-service-subcontainer">
            <div className="our-service-subheader">
              <div className="our-service-subheader-icon">
                <img src={targetIcon} alt="icon" />
              </div>
              <div className="our-service-subheader-text">
                <h4>Matching vacancy to client profile</h4>
              </div>
            </div>
            <div className="our-service-subcontainer-text">
              We personally match the best vacancy in accordance with your
              experience, skills and requirements.
            </div>
          </li>

          <li className="our-service-subcontainer">
            <div className="our-service-subheader">
              <div className="our-service-subheader-icon">
                <img src={teamSupportIcon} alt="icon" />
              </div>
              <div className="our-service-subheader-text">
                <h4>Paperwork assistance</h4>
              </div>
            </div>
            <div className="our-service-subcontainer-text">
              Our agency will handle all the process of getting working visa,
              including applying for the visa and all necessary consultations
              with our legal department.
            </div>
          </li>

          <li className="our-service-subcontainer">
            <div className="our-service-subheader">
              <div className="our-service-subheader-icon">
                <img src={studyIcon} alt="icon" />
              </div>
              <div className="our-service-subheader-text">
                <h4>Interview Course</h4>
              </div>
            </div>
            <div className="our-service-subcontainer-text">
              We provide intensive training and interview simulations to help
              you perform confidently in front of employers and interview
              successfully.
            </div>
          </li>

          <li className="our-service-subcontainer">
            <div className="our-service-subheader">
              <div className="our-service-subheader-icon">
                <img src={bagIcon} alt="icon" />
              </div>
              <div className="our-service-subheader-text">
                <h4>Employment process</h4>
              </div>
            </div>
            <div className="our-service-subcontainer-text">
              Our agency specializes in overseas employment and offers a wide
              range of vacancies in various countries around the world.
            </div>
          </li>

          <li className="our-service-subcontainer">
            <div className="our-service-subheader">
              <div className="our-service-subheader-icon">
                <img src={phonemanIcon} alt="icon" />
              </div>
              <div className="our-service-subheader-text">
                <h4>SUpport on all employment stages</h4>
              </div>
            </div>
            <div className="our-service-subcontainer-text">
              We provide full support at all stages of employment, from job
              search to successful conclusion of the employment contract and
              adaptation to the new place of work.
            </div>
          </li>
        </ul>
      </section>

      <section className="vacancies-list-section">
        <h2 className="home-h2 h2-common">Vacancies</h2>
        <ListVacanciesComponent
          listVacanciesRequestUrl={listVacanciesRequestUrl}
        />
        <div className="vacancies-link-container">
          <Link to="/vacancies" className="navLinks ">
            More vacancies
            <span className="vacancies-link-icon">{">"}</span>
          </Link>
        </div>
      </section>

      <section className="our-partners-section">
        <h2 className="home-h2 h2-common">Our partners</h2>
        <ul className="our-partners-container">
          <li className="our-partners-subcontainer">
            <img src={kofolaIcon} alt="Logo" />
          </li>
          <li className="our-partners-subcontainer">
            <img src={lidlIcon} alt="Logo" />
          </li>
          <li className="our-partners-subcontainer">
            <img src={kauflandIcon} alt="Logo" />
          </li>
          <li className="our-partners-subcontainer">
            <img src={ceskaPostaIcon} alt="Logo" />
          </li>
        </ul>
      </section>
    </>
  );
};
