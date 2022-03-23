import React, { useContext } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedin && (
        <li>
          <NavLink to={`/${auth.userId}/places`} exact>
            My Places
          </NavLink>
        </li>
      )}
      {auth.isLoggedin && (
        <li>
          <NavLink to="/places/new" exact>
            Add Places
          </NavLink>
        </li>
      )}
      {!auth.isLoggedin && (
        <li>
          <NavLink to="/auth" exact>
            Authenticate
          </NavLink>
        </li>
      )}
      {auth.isLoggedin && (
        <li>
          <button onClick={auth.logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};
export default NavLinks;
