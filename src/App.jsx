import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
   Inventory,
   Checkout,
   Login,
   Register,
   TonerDetails,
   EditToner,
} from "./pages";
import { TonerProvider } from "./context/TonerContext";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NavBar from "./components/NavBar.jsx";

function Layout() {
   const location = useLocation();

   const hideNav =
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/";

   return (
      <>
         {!hideNav && <NavBar />}
         <Routes>
            <Route
               path="/inventory"
               element={
                  <ProtectedRoute>
                     <Inventory />
                  </ProtectedRoute>
               }
            />
            <Route
               path="/checkout"
               element={
                  <ProtectedRoute>
                     <Checkout />
                  </ProtectedRoute>
               }
            />
            <Route
               path="/toner/:id/edit"
               element={
                  <ProtectedRoute requireRole="ADMIN">
                     <EditToner />
                  </ProtectedRoute>
               }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/toner/:id" element={<TonerDetails />} />
            <Route path="/" element={<Login />} />
         </Routes>
      </>
   );
}

export default function App() {
   return (
      <AuthProvider>
         <TonerProvider>
            <BrowserRouter>
               <Layout />
            </BrowserRouter>
         </TonerProvider>
      </AuthProvider>
   );
}
