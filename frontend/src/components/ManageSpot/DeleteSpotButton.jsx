import { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";

export default function DeleteSpotButton({ spotId }) {
  const id = spotId;
  // const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
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
          modalComponent={<DeleteSpotModal spotId={id} />}
        />
      </div>
    </>
  );
}
