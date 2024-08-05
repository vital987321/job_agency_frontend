import "../../css/commonTools.css";

export const ApplicationStatusMarker = (props) => {
  if (props.status == "Rejected")
    return <span className="application-status-marker-rejected">&#11044;</span>;
  if (props.status == "Approved")
    return <span className="application-status-marker-approved">&#11044;</span>;
  return <span className="application-status-marker-pending">&#11044;</span>;
};

export const phoneValidation = (phone) => {

  let phoneObject = {
    phoneIsValid: true,
    validatedPhone: "",
    phoneValidationErrors: "",
  };

  for (let symbol of phone) {
    if (symbol.toLowerCase() != symbol.toUpperCase()) {
      phoneObject.phoneIsValid=false
      phoneObject.phoneValidationErrors="Letters are not allowed"
      return phoneObject
    }
  }

  let tempPhone = "";
  for (let symbol of phone) {
    if ("+0123456789".includes(symbol)) tempPhone += symbol;
  }

  
  phoneObject.validatedPhone = tempPhone.slice(0, 1).toString(); // "+" is allowed at the beginning

  for (let symbol of tempPhone.slice(1)) {
    if ("0123456789".includes(symbol)) {
      phoneObject.validatedPhone += symbol;
    }
  }

  if (phoneObject.validatedPhone.length > 25) {
    phoneObject.phoneValidationErrors = "Too long number";
    phoneObject.phoneIsValid=false
  }
  return phoneObject;
};


export const emailValidation=(email)=>{
  let emailObject={
    isValid: true,
    validationErrors: ""
  }
 
  if (
    !email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    emailObject.isValid= false
    emailObject.validationErrors = "Enter correct email address";
  }
  return emailObject
}