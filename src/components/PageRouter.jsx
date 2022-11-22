import React from "react";
import AllCalls from "../pages/allCalls/AllCalls.js";
import Inbox from "../pages/inbox/Inbox.jsx";
import Settings from "../pages/settings/Settings.jsx";
import ErrorPage from "./ErrorPage.jsx";

const PageRouter = ({ currentPage }) => {
  switch (currentPage) {
    case 0:
      return <Inbox />;
    case 1:
      return <AllCalls />;
    case 2:
      return <Settings />;
    default:
      return <ErrorPage code={"404"} description={"Page Not Found"} />;
  }
};

export default PageRouter;
