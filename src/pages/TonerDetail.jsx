import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { CardContent, Typography, Card } from "@mui/material";

export default function TonerDetails() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [toner, setToner] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchToner() {
         try {
            const res = await api.get("/toners");
            const found = res.data.find((t) => t.id === Number(id));
            setToner(found);
         } catch (error) {
            console.error(error);
         } finally {
            setLoading(false);
         }
      }
      fetchToner();
   }, [id]);

   if (loading)
      return (
         <Typography variant="h2" padding={20}>
            Loading...
         </Typography>
      );

   if (!toner)
      return (
         <Typography variant="h2" padding={20}>
            Toner not found.
         </Typography>
      );

   // Deconstruct incoming user
   const token = localStorage.getItem("token");
   const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

   return (
      <div style={{ padding: 20 }}>
         <Card sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
            <CardContent>
               <Typography variant="h4" gutterBottom>
                  {toner.model}
               </Typography>

               <Typography>
                  <strong>Color: </strong> {toner.color}
               </Typography>

               <Typography>
                  <strong>Stock: </strong> {toner.stock}
               </Typography>
            </CardContent>
         </Card>
      </div>
   );
}
