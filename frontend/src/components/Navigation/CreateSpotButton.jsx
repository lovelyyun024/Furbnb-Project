import { NavLink } from "react-router-dom";

const CreateSpotButton = ({user}) => {
  return (
    <>
    {user &&
      <NavLink exact to="/spots/new" style={{ textDecoration: "none" }}>
        <button>Create a New Spot</button>
      </NavLink>}
    </>
  );
};

export default CreateSpotButton;
