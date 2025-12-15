import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
// Navigation bar with conditional links based on authentication
export default function NavBar() {
   const { user, logout } = useAuth();
   const navigate = useNavigate();

   return (
      <AppBar position="static" sx={{ background: "#333" }}>
         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
               variant="h6"
               sx={{ cursor: "pointer" }}
               onClick={() => navigate("/")}
            >
               Toner Manager
            </Typography>

            <Box>
               {user?.role === "ADMIN" && (
                  <Button
                     color="inherit"
                     onClick={() => navigate("/inventory")}
                  >
                     Inventory
                  </Button>
               )}

               {user && (
                  <Button color="inherit" onClick={() => navigate("/checkout")}>
                     Checkout
                  </Button>
               )}

               {!user && (
                  <Button color="inherit" onClick={() => navigate("/login")}>
                     Login
                  </Button>
               )}

               {user && <LogoutButton />}
            </Box>
         </Toolbar>
      </AppBar>
   );
}
