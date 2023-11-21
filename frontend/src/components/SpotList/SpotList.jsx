import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import './SpotList.css'


export default function SpotList() {
  const dispatch = useDispatch();

  //   return (
  //     <>
  //       <h1>Welcome!</h1>
  //       <p>Pedro!</p>
  //     </>
  //   );
  // }

  const spotsData = useSelector((state) => state.spots);
  const spotList = Object.values(spotsData);
  console.log("result", spotsData);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <>

      {spotList?.map(({ id, city, state, previewImage, avgRating, price }) => (
        <div className="spot">
          <img src={previewImage} alt="Example Image" />
          <div className="star">
          <p key={id}>{city}, {state}</p>
          <p key={id}>{avgRating}</p>
          </div>
          <p key={id}>${price} night</p>
        </div>
      ))}
    </>
  );
  // return (
  //   <>
  //     <h1>Welcome!</h1>
  //     <p>Pedro!</p>
  //   </>
  // );
}
