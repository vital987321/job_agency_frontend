import React, { useEffect, useState } from "react";
import closeIcon from '../../svg/X.svg'
import { Form } from "react-router-dom";
import "../../css/authentication.css";
import axios from "axios";

const usernameRef=React.createRef();
const passwordRef=React.createRef();
const passwordRepeatRef=React.createRef();


export const AuthenticationComponent=()=>{
    const [authenticationAction, setAuthenticationMethod]=useState('login') // login signup

    const PassworRepeatComponent=()=>{
        if (authenticationAction=='signup'){
            return <input 
                    className="authentication-text-input"
                    type="password"
                    placeholder="Repeat Password"
                    ref={passwordRepeatRef}
                />
        }
        return <div className="password-repeat-space-holder authentication-text-input"></div>
    }

    const closeButtonHandler=()=>{
        
        // props.setAppFormDisplayValue('none')
      }
    
      const authenticationActionButtonHandler=(e)=>{
        e.preventDefault()
        if (e.target.id=="authentication-action-button-login"){
            setAuthenticationMethod('login')
            e.target.style.backgroundColor="#C9C9C9"
            const oppositeButton=document.getElementById('authentication-action-button-signup')
            oppositeButton.style.backgroundColor="transparent"
        }
        if (e.target.id=="authentication-action-button-signup"){
            setAuthenticationMethod('signup')
            e.target.style.backgroundColor="#C9C9C9"
            const oppositeButton=document.getElementById('authentication-action-button-login')
            oppositeButton.style.backgroundColor="transparent"
        }
        
      }
    
      const authenticationFormSubmitHandler=(e)=>{
        e.preventDefault()
        const username=usernameRef.current.value
        const password=passwordRef.current.value
        const passwordRepeat=passwordRepeatRef.current.value
        
        const signupRequesrURL='http://127.0.0.1:8000/user/'
        axios
            .post(signupRequesrURL,
                {
                    username:username,
                    password:password,
                    phone:'555'
                }
            )
            .then((response)=>console.log('response sratus: '+response.status))
            .catch((err)=>{console.log('Application error:')
                console.log(err)})

      }
    
    return <section className="authentication-modal-window">
        <div className="authentication-modal-window-container">
            <div className="vacancy-filter-close-container">
                <img className='vacancy-filter-close-button' 
                onClick={closeButtonHandler} src={closeIcon} 
                alt="X" />
            </div>
           <form className="authentication-form"
                onSubmit={authenticationFormSubmitHandler}
           >
            
                <div className="authentication-action-buttons-container">
                    <button 
                        className="authentication-action-buttons"
                        id="authentication-action-button-login"
                        onClick={authenticationActionButtonHandler}
                    >
                        Log in
                    </button>
                    <button 
                        className=" authentication-action-buttons"
                        id="authentication-action-button-signup"
                        onClick={authenticationActionButtonHandler}
                    >
                        Sign up
                    </button>
                </div>
                <input 
                    className="authentication-text-input"
                    type="email"
                    placeholder="User e-mail"
                    ref={usernameRef}
                    required
                />
                <input 
                    className="authentication-text-input"
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                    required
                />
                <PassworRepeatComponent/>
                <input
                    type="submit"
                    className="authentication-submit-button button-common"
                    value="Enter"
                />

            </form> 
        </div>
        
    </section>
}