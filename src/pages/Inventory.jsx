// This is the Inventory page where you can manage toner inventory (add, view, delete)

import { useEffect, useState } from "react";
// import { useToners } from "../context/TonerContext";

import { TextField, Button, Typography } from "@mui/material";
import api from "../services/api";
import { TonerCard } from "../components";

export default function Inventory() {
   const [toners, setToners] = useState([]);

   const [model, setModel] = useState("");
   const [printer, setPrinter] = useState("");
   const [color, setColor] = useState("");
   const [stock, setStock] = useState(0);

   // Fetch all toners from backend when page loads
   useEffect(() => {
      async function fetchData() {
         try {
            const res = await api.get("/toners");
            setToners(res.data);
         } catch (error) {
            console.error(error);
         }
      }
      fetchData();
   }, []);
// Handle adding a new toner
   async function handleAdd(e) {
      e.preventDefault();
      try {
         const payload = {
            model,
            color,
            printers: printer
               .split(",")
               .map((p) => p.trim())
               .filter((p) => p.length > 0),
            stock: Number(stock),
         };
         const res = await api.post("/toners", payload);

         setToners((prev) => [...prev, res.data]);
         setModel("");
         setPrinter("");
         setColor("");
         setStock(0);
      } catch (error) {
         console.error(error);
         alert("Failed to add toner");
      }
   }
// Handle deleting a toner
   async function handleDelete(id) {
      if (
         !window.confirm("WARNING: Are you sure you want to delete this toner?")
      )
         return;

      try {
         await api.delete(`/toners/${id}`);

         setToners((prev) => prev.filter((t) => t.id !== id));
      } catch (error) {
         console.error(error);
         alert("Failed to delete toner");
      }
   }

   return (
      <div style={{ padding: 20 }}>
         <Typography variant="h4" gutterBottom>
            Inventory Management
         </Typography>

         <form
            onSubmit={handleAdd}
            style={{ marginBottom: 20, display: "flex", gap: 10 }}
         >
            <TextField
               label="Model"
               value={model}
               onChange={(e) => setModel(e.target.value)}
               required
            />
            <TextField
               label="Printers (comma separated)"
               value={printer}
               onChange={(e) => setPrinter(e.target.value)}
               required
            />
            <TextField
               label="Color"
               value={color}
               onChange={(e) => setColor(e.target.value)}
               required
            />
            <TextField
               label="Stock"
               type="number"
               value={stock}
               onChange={(e) => setStock(e.target.value)}
               required
            />
            <Button type="submit" variant="contained">
               Add
            </Button>
         </form>

         <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            {toners.map((toner) => (
               <TonerCard
                  key={toner.id}
                  toner={toner}
                  mode="inventory"
                  onDelete={handleDelete}
               />
            ))}
         </div>
      </div>
   );
}
