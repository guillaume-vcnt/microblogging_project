import { NavLink } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import "../style/utilities-style/Navigation.css";

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <NavLink to="/login" className="active-link">
          <li>Login</li>
        </NavLink>
        <NavLink to="/userprofil" className="active-link">
          <li>
            <button>User Profil</button>
          </li>
        </NavLink>
        <NavLink to="/wall" className="active-link">
          <li>Wall</li>
        </NavLink>
      </ul>
    </div>
  );
};

const UserProfileLink = () => {
  return (
    <NavLink to="/userprofil">
      <div className="user-profil-div">
        <button className="user-profil-button">
          <FaUserLarge className="user-profil-icon" />
        </button>
      </div>
    </NavLink>
  );
};

export { Navigation, UserProfileLink };
