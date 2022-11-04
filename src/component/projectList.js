import Projects from "./projects";
import { useState, useEffect } from "react";

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
  return (
    <>
      {(!isClicked && (
        <div className="project-list">
          <button className="new-project-btn" onClick={
            
          }>New Project</button>
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
