const NewProject = () => {
  return (
    <div className="new-project">
      <form className="project-form">
        <label htmlFor="">Project Name</label>
        <input type="text" />
        <label htmlFor="">Language Used</label>
        <input type="text" />
        <label htmlFor="">Project Description</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </form>
    </div>
  );
};

export default NewProject;
