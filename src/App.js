import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./login";
import Navbar from "./component/Navbar";
import Menu from "./component/menu";
import Signup from "./signUp";
import ProjectList from "./component/projectList";
import CreateProject from "./component/createProject";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
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
          <Routes>
            <Route path="/createProject" element={<CreateProject />}></Route>
            <Route path="/" element={<ProjectList />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
