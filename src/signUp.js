const Signup = () => {
  function click() {
    window.location.href = "https://protected-crag-71641.herokuapp.com/";
    console.log("clicked");
  }
  return (
    <div className="signup">
      <form
        action="http://localhost:5000/signup"
        className="signup-form"
        method="POST"
      >
        <label htmlFor="">email</label>
        <input type="text" name="email" />
        <label htmlFor="">password</label>
        <input type="password" name="password" />
        <label htmlFor="">name</label>
        <input type="text" name="name" id="" />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default Signup;
