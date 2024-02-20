import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul id="nav-container" style={{  }}>
      <li>
        <NavLink exact to="/">
          <img
            src="../../../public/furbnblogo.png"
            alt="Logo"
            style={{ width: "80px" }}
          />
        </NavLink>
      </li>
      {isLoaded && (
        <li id="user-menu">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
