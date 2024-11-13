import { Link, NavLink} from "react-router-dom";

const MenuList=()=>{
  return(
    <ul className="navbar-nav me-auto mb-2 mb-md-0">
    <li className="nav-item">
      <NavLink className="nav-link" aria-current="page" to="/">
        Home
      </NavLink>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/register">
        Register
      </Link>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/blogs">
        Blog
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/about">
        About
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/author">
        Author
      </NavLink>
    </li>
  </ul>
  )
}
export default MenuList;