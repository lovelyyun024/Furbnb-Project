import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import CreateSpotButton from "./CreateSpotButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul id="nav-container" style={{ borderBottom: "2px solid #B0B0B0" }}>
      <li>
        <NavLink exact to="/">
          <img
            src="https://scontent-sea1-1.xx.fbcdn.net/v/t1.6435-9/211426966_276777007455136_8557162422871458312_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=be3454&_nc_ohc=8_SRFE7fi2kAX--3pSO&_nc_ht=scontent-sea1-1.xx&oh=00_AfCoilr_f2DEWk8-K83aTH4Y3kM0gHuR90eU3EOMz1yooA&oe=65849C6A"
            alt="Logo"
            style={{width: "100px"}}
          />
        </NavLink>
      </li>
      <li></li>
      {isLoaded && (
        <li id="user-menu">
          <CreateSpotButton  user={sessionUser} />
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
