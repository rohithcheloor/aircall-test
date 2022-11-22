import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header.jsx";
import PageRouter from "./components/PageRouter.jsx";

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const changePage = (page) => {
    setPrevPage(currentPage);
    setCurrentPage(page);
  };
  return (
    <div className="container p-0">
      <Header currentPage={currentPage} changePage={changePage} />
      <div className="container-view">
        <ToastContainer />
        <PageRouter
          currentPage={currentPage}
          prevPage={prevPage}
          changePage={changePage}
        />
      </div>
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

export default App;
