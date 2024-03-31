import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import "./ApplicationForm.css";

export const ApplicationFormComponent = () => {
  return (
    <>
      <form action="" id="application-form">
        <div className="application-form-container">
            <div className="application-form-header">
                <h3>Housekeeper</h3>
            <p>Fill-in this application form and we will contact you ASAP</p>
            </div>
            
          <div className="application-form-inputs-container">
            <input className="application-form-user-input"
              type="text"
              id="first-name-application-form"
              placeholder="First Name"
            />
            <input
            className="application-form-user-input"
              type="text"
              id="last-name-application-form"
              placeholder="Last Name"
            />
            <input
            className="application-form-user-input"
              type="text"
              id="phone-application-form"
              placeholder="Phone"
            />
            <input
            className="application-form-user-input"
              type="text"
              id="email-application-form"
              placeholder="Email"
            />
            
            <input type="file" className="cv-application-form" />
          </div>

          <div className="application-form-message-container">
            <label htmlFor="message-application-form">Your message:</label>
            <textarea
              name=""
              id="message-application-form"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="application-form-submit-block">
            <input className="application-form-submit-button"  type="submit" value="Apply" />
          </div>
          
        </div>
      </form>
    </>
  );
};
