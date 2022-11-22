import React from "react";
import { createRoot } from "react-dom/client";

import Header from "./components/Header.jsx";

const App = () => {
  return (
    <div className="container p-0">
      <Header />
      <div className="container-view">Some activities should be here</div>
    </div>
  );
};

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

export default App;
