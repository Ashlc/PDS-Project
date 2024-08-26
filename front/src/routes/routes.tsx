import Home from '@pages/Home';
import Landing from '@pages/Landing';
import { createBrowserRouter } from "react-router-dom";
import PrivateLayout from "../layouts/PrivateLayout";


export const AppRoutes = createBrowserRouter([
  {
    element: <PrivateLayout />,
    children: [
      { path: '/home', element: <Home /> },
    ],
  },
  { path: '/', element: <Landing /> },
]);

export default AppRoutes;