import { useState, useEffect } from "react";
import Projects from "./projects";
const CreateProject = () => {
  const [appName, setappName] = useState();
  const [appDescription, setappDescription] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [response, setResponse] = useState();
  const devId = sessionStorage.getItem("devID");
  async function handleSubmit(e) {
    e.preventDefault();
    const rawres = await fetch(`http://localhost:5000/newProject/${devId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appName: appName,
        appDescription: appDescription,
      }),
    });
    const res = await rawres.json();
    setResponse(res);
    setIsClicked(true);
    console.log(res);
  }
  return (
    (!isClicked && (
      <form className="create-project">
        <label htmlFor="">App Name</label>
        <input
          type="text"
          value={appName}
          onChange={(e) => setappName(e.target.value)}
        />
        <label htmlFor="">App Description</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          type="text"
          value={appDescription}
          onChange={(e) => setappDescription(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    )) ||
    (isClicked && (
      <>
        <Projects app={response} />
      </>
    ))
  );
};

export default CreateProject;
