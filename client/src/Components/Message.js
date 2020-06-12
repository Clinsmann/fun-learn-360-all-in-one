import React from "react";

export default ({message}) => {
  const {message: {msgBody, msgError}} = message;
  const getMessageOrError = () => {
    if (msgBody) {
      if (msgBody._message) return msgBody._message;
      return msgBody;
    }
  };

  return (
    <div role='alert'
         className={`alert ${msgError ? 'alert-danger' : 'alert-primary'} text-center`}>
      {getMessageOrError()}
    </div>
  )
};
