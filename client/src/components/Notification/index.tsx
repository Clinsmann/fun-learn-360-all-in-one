import React from "react";
import "./styles.scss";
import {toast} from "react-toastify";
import {ReactComponent as CloseIcon} from "./icons/close.svg";
import {ReactComponent as ErrorIcon} from "./icons/error.svg";
import {ReactComponent as WarningIcon} from "./icons/warning.svg";
import {ReactComponent as SuccessIcon} from "./icons/success.svg";

const variantIcon: any = {
  error: <ErrorIcon/>,
  warning: <WarningIcon/>,
  success: <SuccessIcon/>
};

export interface NotifyProps {
  title: string;
  message: string;
  variant: 'success' | 'warning' | 'error';
}

interface OwnProps {
  closeToast?: () => void;
}

type IProps = NotifyProps & OwnProps;

const Notification: React.FC<IProps> = ({title, message, closeToast, variant}) => (
  <div className='notification-container'>
    <div className="info">
      {variantIcon[variant]}
      <div className="message">
        <h2>{title}</h2>
        <p className='mb-0'>{message}</p>
      </div>
    </div>
    <button onClick={closeToast}><CloseIcon/></button>
  </div>
);

/*usage -> notify({title: "TitleHere", message: "MessageHere", variant: "success"})*/
export const notify = (props: NotifyProps) => toast(<Notification {...props}/>);

export default Notification;
