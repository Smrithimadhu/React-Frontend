import { NavLink } from "react-router-dom";

const MenuList = () => {
 
  return (
    <ul className="navbar-nav me-auto mb-2 mb-md-0">
      <li className="nav-item">
      <NavLink className="nav-link" aria-current="page" to="/">
        Home
      </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/registration">
          Registration
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/blogs">
          Blogs
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/authors">
          Authors
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </li>
    </ul>
  );
};

export default MenuList;
