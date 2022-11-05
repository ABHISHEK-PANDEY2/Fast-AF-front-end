import Projects from "./projects";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthView from "../useAuthView";

// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onValue } from "firebase/database";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   // ...
//   // The value of `databaseURL` depends on the location of the database
//   databaseURL: "https://fastaf-mobile.firebaseio.com",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// // Initialize Realtime Database and get a reference to the service
// const database = getDatabase(app);
// const userId = "lDU3VpsUOOhc80aMehTCyg9VQml1";
// const authFinishRef = ref(db, "users/" + userId + "/authFinished");
// onValue(authFinishRef, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

const ProjectList = () => {
  const [list, setList] = useState();
  const [recieved, setRecieved] = useState(false);
  const [clickedProject, setClickedProject] = useState();
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    async function data() {
      const devId = sessionStorage.getItem("devId");
      const rawres = await fetch(`http://localhost:5000/appList/${devId}`, {
        headers: {
          token: "j",
        },
      });
      const res = await rawres.json();
      setList(res.apps);
      console.log(res.apps);
      setRecieved(true);
    }
    data();
    return () => {
      console.log("clear");
    };
  }, []);
  function showProject(name) {
    console.log(name);
    return list.map((app) => {
      if (app.appname === name) {
        setClickedProject(app);
        setIsClicked(true);
      }
    });
  }
  class FastAF {
    constructor() {}
    init(clientID, clientSecret, userID, devID) {
      async function sendCreds() {
        sessionStorage.setItem("clientId", clientID);
        sessionStorage.setItem("clientSecret", clientSecret);
        sessionStorage.setItem("userId", userID);
        sessionStorage.setItem("devId", devID);
        console.log("posting");
        const rawres = await fetch(
          "https://protected-crag-71641.herokuapp.com/init",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clientID: clientID,
              clientSecret: clientSecret,
              userID: userID,
              devID: devID,
            }),
          }
        );
        const res = await rawres.json();
        console.log(res);
        sessionStorage.setItem("appId", res.appId);
      }
      sendCreds();
    }
    startAuth() {
      window.location.href = "http://127.0.0.1:5500/authView/index.html";
    }
  }

  const fastAF = new FastAF();
  const username = sessionStorage.getItem("username");
  const devId = sessionStorage.getItem("devID");
  fastAF.init("gh5sd1gtb", "qycxxsg96", username, devId);
  return (
    <>
      {(!isClicked && (
        <div className="project-list">
          <Link to="/createProject">
            <button className="new-project-btn">New Project</button>
          </Link>
          {recieved &&
            list.map((app, i) => {
              //   console.log(app);
              return (
                <div
                  className="project-tile"
                  key={i}
                  onClick={() => showProject(app.appname)}
                >
                  <div className="appname">{app.appname}</div>
                  <div className="app-lang">{app.lang}</div>
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
