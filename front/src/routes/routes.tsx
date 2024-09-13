import Home from '@pages/Home';
import Landing from '@pages/Landing';
import Report from '@pages/Report';
import ViewReport from '@pages/ViewReport';
import { createBrowserRouter } from 'react-router-dom';
import PrivateLayout from '../layouts/PrivateLayout';

export const AppRoutes = createBrowserRouter([
  {
    element: <PrivateLayout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/reporte/:id', element: <ViewReport /> },
      { path: '/reporte', element: <Report /> },
    ],
  },
  { path: '/', element: <Landing /> },
]);

export default AppRoutes;
