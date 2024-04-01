import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import "./ApplicationForm.css";
import axios from "axios";

const firstNameRef=React.createRef();
const lastNameRef=React.createRef();
const phoneRef=React.createRef();
const emailRef=React.createRef();
const messageRef=React.createRef();
const cvFileRef=React.createRef();



export const ApplicationFormComponent = (props) => {
  const appFormSubmitHandler = (event) => {
    event.preventDefault();
    const applicationPostURL="http://127.0.0.1:8000/application/";
    const firstName=firstNameRef.current.value
    const lastName=lastNameRef.current.value
    const email=emailRef.current.value
    const phone=phoneRef.current.value
    const message=messageRef.current.value
    const cvFile=cvFileRef.current.value

    let formData=new FormData()
    formData.append("cv", cvFile)

    axios
        .post(applicationPostURL,
            {
                "vacancy":props.vacancy.id,
                "first_name":firstName,
                "last_name":lastName,
                "email":email,
                "phone":phone,
                "message":message,
            },
            formData,
            {headers:{"Content-Type": "multipart/form-data",}}
        )
        .then((response)=>console.log('response sratus: '+response.status))
        .then(()=>alert('Application sent succesfully'))
        .then(()=>props.setAppFormDisplayValue('none'))
        .catch((err)=>console.log(err.code))
  };

  return (
    <>
      <form
        id="application-form"
        onSubmit={appFormSubmitHandler}
        style={{ display: props.AppFormDisplayValue }}
      >
        <div className="application-form-container">
          <div className="application-form-header">
            <h3>{props.vacancy.name}</h3>
            <p>Fill-in this application form and we will contact you ASAP</p>
          </div>

          <div className="application-form-inputs-container">
            <input
              className="application-form-user-input"
              type="text"
              id="first-name-application-form"
              placeholder="First Name"
              ref={firstNameRef}
            />
            <input
              className="application-form-user-input"
              type="text"
              id="last-name-application-form"
              placeholder="Last Name"
              ref={lastNameRef}
            />
            <input
              className="application-form-user-input"
              type="text"
              id="phone-application-form"
              placeholder="Phone"
              ref={phoneRef}
            />
            <input
              className="application-form-user-input"
              type="text"
              id="email-application-form"
              placeholder="Email"
              ref={emailRef}
            />

            <input type="file" className="cv-application-form" ref={cvFileRef}/>
          </div>

          <div className="application-form-message-container">
            <label htmlFor="message-application-form">Your message:</label>
            <textarea
              name=""
              id="message-application-form"
              cols="30"
              rows="10"
              ref={messageRef}
            ></textarea>
          </div>
          <div className="application-form-submit-block">
            <input
              className="application-form-submit-button"
              type="submit"
              value="Apply"
            />
          </div>
        </div>
      </form>
    </>
  );
};
