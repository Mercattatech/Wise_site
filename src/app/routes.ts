import { createBrowserRouter } from 'react-router';
import InstitutionalSite from './InstitutionalSite';
import LandingPage from './LandingPage';
import AdminPage from './AdminPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: InstitutionalSite,
  },
  {
    path: '/evento',
    Component: LandingPage,
  },
  {
    path: '/admin',
    Component: AdminPage,
  },
]);
