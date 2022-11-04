const Projects = (props) => {
  const app = props.app;
  console.log(app);
  return (
    <div className="project">
      <div className="app-details">
        <h1 className="app-name">{app.appName}</h1>
        <span className="clientId">
          Client Id : <strong>{app.appCreds.clientId}</strong>
        </span>
        <br />
        <span className="clientSecret">
          Client Secret : <strong>{app.appCreds.clientSecret}</strong>
        </span>
        <br />
        <p>
          <strong>App Description : </strong>
          {app.appDes}
        </p>
      </div>
    </div>
  );
};

export default Projects;
