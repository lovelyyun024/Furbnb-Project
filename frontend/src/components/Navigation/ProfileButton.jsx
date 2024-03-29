import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import "./ProfileButton.css";
import { TfiMenu } from "react-icons/tfi";
import { FaCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { resetUserSpots } from "../../store/userSpots";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
    const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(resetUserSpots());
    navigate(`/`);
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-container">
      <button onClick={toggleMenu}>
        <TfiMenu />
        <FaCircleUser style={{fontSize:"30px"}}/>
        {/* <i className="fas fa-user-circle" /> */}
      </button>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName}</li>
            <li className="divider1"> {user.email}</li>
            <li>
              <NavLink
                exact
                to="/spots/current"
                style={{ textDecoration: "none", color: "#222222" }}
              >
                Manage Spots
              </NavLink>
            </li>
            <li className="divider2"></li>
            <li>
              <NavLink
                className="logout-button"
                exact
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                <button onClick={logout}>Log Out</button>
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
