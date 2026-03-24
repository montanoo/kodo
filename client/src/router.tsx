import { createBrowserRouter } from 'react-router';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import AppPage from './pages/AppPage';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: ProtectedRoute,
    children: [{ index: true, Component: AppPage }],
  },
  { path: 'login', Component: Login },
  { path: 'register', Component: Register },
]);
