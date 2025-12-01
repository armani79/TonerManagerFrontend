import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inventory from "./pages/Inventory.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { TonerProvider } from "./context/TonerContext";

export default function App() {
   return (
      <TonerProvider>
         <BrowserRouter>
            <Routes>
               <Route path="/inventory" element={<Inventory />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
            </Routes>
         </BrowserRouter>
      </TonerProvider>
   );
}
