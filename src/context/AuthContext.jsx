import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
         try {
            const decoded = jwtDecode(token);
            setUser(decoded);
         } catch (err) {
            console.error("Invalid token");
            localStorage.removeItem("token");
            setUser(null);
         }
      }

      setLoading(false);
   }, []);

   function login(token) {
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded);
   }

   function logout() {
      localStorage.removeItem("token");
      setUser(null);
   }

   return (
      <AuthContext.Provider value={{ user, login, logout, loading }}>
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used inside AuthProvider");
   }
   return context;
}
