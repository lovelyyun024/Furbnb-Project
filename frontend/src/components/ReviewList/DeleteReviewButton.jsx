import { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteFormModal from "./DeleteReviewModal";

export default function DeleteReviewButton({review, spot}) {
  const reviewId = review
  const spotId = spot
  // console.log(reviewId)
  // const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
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
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="OpenModalButton">
        <OpenModalMenuItem
          itemText="Delete"
          onItemClick={closeMenu}
          modalComponent={<DeleteFormModal review={reviewId} spot={spotId} />}
        />
      </div>
    </>
  );
}
