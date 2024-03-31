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
            <label htmlFor="first-name-application-form">First name:</label>
            <input
              type="text"
              id="first-name-application-form"
              placeholder="FirstName"
            />
            <label htmlFor="last-name-application-form">Last name:</label>
            <input
              type="text"
              id="last-name-application-form"
              placeholder="LastName"
            />
            <label htmlFor="phone-application-form">Phone:</label>
            <input
              type="text"
              id="phone-application-form"
              placeholder="phone"
            />
            <label htmlFor="email-application-form">Email:</label>
            <input
              type="text"
              id="email-application-form"
              placeholder="email"
            />
            <label htmlFor="CV-application-form">CV:</label>
            <input type="file" id="cv-application-form" />
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
            <input  type="submit" value="Apply" />
          </div>
          
        </div>
      </form>
    </>
  );
};
