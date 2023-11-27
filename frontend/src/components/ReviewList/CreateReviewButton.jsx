import { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal.jsx"
import "./ReviewList.css";

const CreateReviewButton = ({ show, id }) => {
  const showReviewButton = show;
  const spotId = id
  // const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const ulRef = useRef();

  // const toggleMenu = (e) => {
  //   e.stopPropagation(); 
  //   setShowMenu(!showMenu);
  // };

  // console.log(show)
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, isReviewSubmitted]);

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      {showReviewButton &&
        !isReviewSubmitted && (
          <div className="OpenModalButton">
            <OpenModalMenuItem
              itemText="Post Your Review!"
              onItemClick={closeMenu}
              modalComponent={
                <ReviewFormModal
                  // show={showReviewButton && !isReviewSubmitted} 
                  id={spotId}
                  onReviewSubmitted={() => setIsReviewSubmitted(true)}
                />
              }
            />
          </div>
        )}
    </>
  );
};

export default CreateReviewButton;
