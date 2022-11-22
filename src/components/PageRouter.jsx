import React, { useState, useEffect } from "react";
import AllCalls from "../pages/allCalls/AllCalls.jsx";
import Details from "../pages/details/Details.jsx";
import Inbox from "../pages/inbox/Inbox.jsx";
import Settings from "../pages/settings/Settings.jsx";
import ErrorPage from "./ErrorPage.jsx";

const PageRouter = ({ currentPage, prevPage, changePage }) => {
  const [detailsId, setDetailsId] = useState(null); //Can be modified with the use of Redux for better state management.
  switch (currentPage) {
    case 0:
      return <Inbox changePage={changePage} setDetailsId={setDetailsId} />;
    case 1:
      return <AllCalls changePage={changePage} setDetailsId={setDetailsId} />;
    case 2:
      return <Settings changePage={changePage} setDetailsId={setDetailsId} />;
    case 3:
      return (
        <Details
          index={detailsId}
          changePage={changePage}
          prevPage={prevPage}
          setDetailsId={setDetailsId}
        />
      );
    default:
      return <ErrorPage code={"404"} description={"Page Not Found"} />;
  }
};

export default PageRouter;
