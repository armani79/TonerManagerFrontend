import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function NavBar() {
   const navigate = useNavigate();

   const token = localStorage.getItem("token");
   let user = null;

   if (token) {
      try {
         const payload = JSON.parse(atob(token.split(".")[1]));
         user = payload;
      } catch (error) {
         console.error("Invalid token");
      }
   }

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
