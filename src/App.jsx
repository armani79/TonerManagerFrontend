import { BrowserRouter, Routes, Route } from "react-router-dom";
import TonerDetails from "./pages/TonerDetail.jsx";
import Inventory from "./pages/Inventory.jsx";
import Login from "./pages/Login.jsx";
import Checkout from "./pages/Checkout.jsx";
import Register from "./pages/Register.jsx";
import { TonerProvider } from "./context/TonerContext";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
   return (
      <TonerProvider>
         <BrowserRouter>
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
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/toner/:id" element={<TonerDetails />} />
            </Routes>
         </BrowserRouter>
      </TonerProvider>
   );
}
