import Projects from "./projects";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthView from "../useAuthView";
const ProjectList = () => {
  const [list, setList] = useState();
  const [recieved, setRecieved] = useState(false);
  const [clickedProject, setClickedProject] = useState();
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    async function data() {
      const rawres = await fetch("http://localhost:8080/dev");
      const res = await rawres.json();
      setList(res);
      setRecieved(true);
    }
    data();
  }, []);
  function showProject(name) {
    console.log(name);
    return list
      .map((dev) => dev.apps)
      .map((app) => {
        if (app[0].appname === name) {
          setClickedProject(app[0]);
          setIsClicked(true);
        }
      });
  }
  class FastAF {
    constructor() {}
    init(clientID, clientSecret, userID, devID) {
      async function sendCreds() {
        const rawres = await fetch("http://localhost:5000/init", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            clientID: clientID,
            clientSecret: clientSecret,
            userID: userID,
            devID: devID,
          },
        });
        const res = await rawres.json();
        return res;
      }
      sendCreds();
    }
    startAuth() {
      window.location.href = "http://127.0.0.1:5500/authView/index.html";
    }
  }

  // const fastAF = new FastAF();
  return (
    <>
      {(!isClicked && (
        <div className="project-list">
          <Link to="/createProject">
            <button className="new-project-btn">New Project</button>
          </Link>
          {recieved &&
            list
              .map((dev, i) => dev.apps)
              .map((app, i) => {
                //   console.log(app);
                return (
                  <div
                    className="project-tile"
                    key={i}
                    onClick={() => showProject(app[0].appname)}
                  >
                    <div className="appname">{app[0].appname}</div>
                    <div className="app-lang">{app[0].lang}</div>
                  </div>
                );
              })}
        </div>
      )) ||
        (isClicked && <Projects app={clickedProject}></Projects>)}
    </>
  );
};

export default ProjectList;
