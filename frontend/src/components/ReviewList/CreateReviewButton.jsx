import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal.jsx"
import "./ReviewList.css";

const CreateReviewButton = ({ show, id }) => {
  const showReviewButton = show;
  const spotId = id
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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
  // console.log(showReviewButton)

  return (
    <>
      {showReviewButton && (
        // <button>Post Your Review</button>
        <div className="OpenModalButton">
          <OpenModalMenuItem
            itemText="Post Your Review!"
            onItemClick={closeMenu}
            modalComponent={<ReviewFormModal id={spotId} />}
          />
        </div>
      )}
    </>
  );
};

export default CreateReviewButton;
