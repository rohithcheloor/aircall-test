import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import Header from "./components/Header.jsx";
import PageRouter from "./components/PageRouter.jsx";

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div className="container p-0">
      <Header currentPage={currentPage} changePage={setCurrentPage} />
      <div className="container-view">
        <PageRouter currentPage={currentPage} />
      </div>
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

export default App;
