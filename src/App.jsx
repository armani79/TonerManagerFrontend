import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inventory from "./pages/Inventory.jsx";
import { TonerProvider } from "./context/TonerContext";

export default function App() {
   return (
      <TonerProvider>
         <BrowserRouter>
            <Routes>
               <Route path="/inventory" element={<Inventory />} />
            </Routes>
         </BrowserRouter>
      </TonerProvider>
   );
}
