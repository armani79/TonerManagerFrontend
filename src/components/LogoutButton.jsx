import { useNavigate } from "react-router-dom";

function LogoutButton() {
   const navigate = useNavigate();

   const logout = () => {
      localStorage.removeItem("token");
      navigate("/");
   };

   return <Button onClick={logout}>Logout</Button>;
}

export default LogoutButton;
