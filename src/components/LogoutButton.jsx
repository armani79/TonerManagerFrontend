import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function LogoutButton() {
   const navigate = useNavigate();
   const { logout } = useAuth();

   return (
      <Button
         onClick={() => {
            logout();
            navigate("/login");
         }}
      >
         Logout
      </Button>
   );
}

export default LogoutButton;
