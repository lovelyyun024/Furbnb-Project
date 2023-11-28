import { Link } from "react-router-dom";

const CreateSpotButton = ({user}) => {
  return (
    <>
      {user && (
        // <NavLink exact to="/spots/new" style={{ textDecoration: "none" }}>
        //   <button>Create a New Spot</button>
        // </NavLink>
        <Link
          exact
          to="/spots/new"
          style={{
            textDecoration: "none",
            color:"darkred",
            fontSize:"16px"
          }}
        >
          Create a New Spot
        </Link>
      )}
    </>
  );
};

export default CreateSpotButton;
