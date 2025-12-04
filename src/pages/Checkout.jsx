import { useEffect, useState } from "react";
import api from "../services/api";
import TonerCard from "../components/TonerCard";
import { Typography } from "@mui/material";
import AppSnackbar from "../components/AppSnackbar";

export default function Checkout() {
   const [toners, setToners] = useState([]);
   const [loading, setLoading] = useState(true);
   const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
   });

   function showSnackbar(message, severity = "success") {
      setSnackbar({ open: true, message, severity });
   }

   useEffect(() => {
      async function fetchToners() {
         try {
            const res = await api.get("/toners");
            setToners(res.data);
         } catch (error) {
            console.error("Error loading toners: ", error);
         } finally {
            setLoading(false);
         }
      }
      fetchToners();
   }, []);

   async function handleCheckout(id, qty) {
      try {
         const res = await api.put(`/toners/${id}/checkout`, { amount: qty });

         setToners((prev) => prev.map((t) => (t.id === id ? res.data : t)));

         showSnackbar("Checkout successfully!", "success");
      } catch (error) {
         console.error(error);
         showSnackbar(
            error.response?.data?.error || "Checkout failed",
            "error"
         ); // In case we don't get an error code back
      }
   }

   if (loading) {
      return <h2 sty={{ padding: 20 }}>Loading toners...</h2>;
   }

   return (
      <div style={{ padding: 20 }}>
         <Typography variant="h2">Checkout Toner</Typography>
         <div
            style={{
               display: "flex",
               flexWrap: "wrap",
               gap: "20px",
               marginTop: "20px",
            }}
         >
            {toners.map((toner) => (
               <TonerCard
                  key={toner.id}
                  toner={toner}
                  mode="checkout"
                  onCheckout={handleCheckout}
               />
            ))}
         </div>
         <AppSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
         />
         ;
      </div>
   );
}
