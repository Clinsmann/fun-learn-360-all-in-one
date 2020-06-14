import React from "react";
import "./styles.css";
import {toast} from "react-toastify";
import {ReactComponent as CloseIcon} from "./icons/close.svg";
import {ReactComponent as ErrorIcon} from "./icons/error.svg";
import {ReactComponent as WarningIcon} from "./icons/warning.svg";
import {ReactComponent as SuccessIcon} from "./icons/success.svg";

const variantIcon = {
  error: <ErrorIcon/>,
  warning: <WarningIcon/>,
  success: <SuccessIcon/>
};

const Notification = ({title, message, closeToast, variant}) => (
  <div className='notification-container'>
    <div className="info">
      {variantIcon[variant]}
      <div className="message">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
    <button onClick={closeToast}><CloseIcon/></button>
  </div>
);

// USAGE  notify({title: "Success title", message: "Your task was successful", variant: "success"})
export const notify = ({title, message, variant = "warning"}) =>
  toast(<Notification variant={variant} title={title} message={message}/>);

export default Notification;
