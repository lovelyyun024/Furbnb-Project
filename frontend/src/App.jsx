import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SpotList from './components/SpotList/SpotList'
import SpotDetails from './components/SpotDetails/SpotDetails'
import ReviewList from './components/ReviewList/ReviewList'
import CreateSpot from './components/CreateSpot/CreateSpot';
import ManageSpot from './components/ManageSpot/ManageSpot';
import UpdateSpot from './components/UpdateSpot/UpdateSpot'
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
            <ReviewList />
          </>
        ),
      },
      {
        path: "/spots/:spotId/edit",
        element: <UpdateSpot />,
      },
      {
        path: "/spots/current",
        element: <ManageSpot />,
      },
      {
        path: "/spots/new",
        element: <CreateSpot />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
