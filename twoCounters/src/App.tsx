import React from "react";
import "./App.css";
import Count from "./components/Count";
import Count2 from "./components/Count2";

const App: React.FC = () => {
  return (
    <div>
      <Count />
      <Count2 />
    </div>
  );
};

export default App;
