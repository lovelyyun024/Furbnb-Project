import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SpotList from './components/SpotList/SpotList'
import SpotDetails from './components/SpotDetails/SpotDetails'
import ReviewList from './components/ReviewList/ReviewList'
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SpotList />,
      },
      {
        path: "/spots/:spotId",
        element: (
          <>
            <SpotDetails />
            {/* <Outlet /> */}
            <ReviewList />
          </>
        ),
        // children: [{ path: "reviews", element: <ReviewList /> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
