import React from "react";

const ErrorPage = ({ code, description }) => {
  return (
    <div className="errorPage">
      {code && <h1>{code}!</h1>}
      <h5>{description}</h5>
    </div>
  );
};

export default ErrorPage;
