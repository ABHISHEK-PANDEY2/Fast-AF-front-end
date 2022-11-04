import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./login";
import Navbar from "./component/Navbar";
import Menu from "./component/menu";
import Signup from "./signUp";
import ProjectList from "./component/projectList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patientData, setPatientData] = useState("");
  const [isLoading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return (
      <Router>
        <>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login option={setIsAuthenticated} />} />
          </Routes>
        </>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Menu />
        <div className="container">
          <ProjectList />
        </div>
      </div>
    </Router>
  );
}

export default App;
