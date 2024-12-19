import "./App.css";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import Invoices from "./components/invoices/Invoices.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className={"app"}>
      <Sidebar />
      <div className={"content"}>
        <Routes>
          <Route path="/" element={<Invoices />} />
          {/*<Route path="/:id" element={<Invoices />} />*/}
          {/*<Route path="*" element={<Invoices />} />*/}
        </Routes>
      </div>
    </div>
  );
}

export default App;
