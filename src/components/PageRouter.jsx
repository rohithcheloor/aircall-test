import React from "react";
import Inbox from "../pages/inbox/Inbox.jsx";
import ErrorPage from "./ErrorPage.jsx";

const PageRouter = ({ currentPage }) => {
  switch (currentPage) {
    case 0:
      return <Inbox />;
    default:
      return <ErrorPage />;
  }
};

export default PageRouter;
