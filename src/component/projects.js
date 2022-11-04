const Projects = (props) => {
  const app = props.app;
  console.log(app);
  return (
    <div className="project">
      <div className="app-details">
        <h1 className="app-name">{app.appname}</h1>
        <span className="clientId">
          Client Id : <strong>{app.appCreds.clientId}</strong>
        </span>
        <br />
        <span className="clientSecret">
          Client Secret : <strong>{app.appCreds.clientSecret}</strong>
        </span>
      </div>
    </div>
  );
};

export default Projects;
