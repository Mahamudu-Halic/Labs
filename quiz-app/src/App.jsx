import { useState } from "react";

import "./App.css";
import ThemeToggler from "./components/ThemeToggler/ThemeToggler.jsx";
import LandingPage from "./components/Landing/Landing.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="wrapper">
      <LandingPage />
    </div>
  );
}

export default App;
