import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="menu">
      <div className="items">
        <ul>
          <Link to="/projectList">
            <li>Projects</li>
          </Link>
          <li>Profile</li>
          <li>Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
