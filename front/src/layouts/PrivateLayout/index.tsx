// import RequireAuth from '@auth-kit/react-router/RequireAuth';
import Header from '@components/Header';
import { Outlet } from 'react-router-dom';
import PageLayout from '../PageLayout';

// type Props = {
//     children: ReactNode
// }

const index = () => (
  // <RequireAuth fallbackPath="/login">
    <>
      <Header/>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </>
  // </RequireAuth>
);

export default index;
