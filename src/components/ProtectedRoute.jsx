import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// prevents access to routes if not logged in
export default function ProtectedRoute({ children }) {
   const { user, loading } = useAuth();

   if (loading) return null;

   if (!user) {
      return <Navigate to="/login" replace />;
   }

   return children;
}
