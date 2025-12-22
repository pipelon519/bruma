import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // While the authentication state is loading, don't render anything
  // This prevents a flicker or showing the login page incorrectly
  if (loading) {
    return null; // Or a loading spinner
  }

  // If the user is authenticated, render the child route
  // The <Outlet /> component is a placeholder for the actual page component
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
