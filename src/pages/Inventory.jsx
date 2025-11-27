// This is the Inventory page where you can manage toner inventory (add, view, delete)

import { useEffect, useState } from "react";
// import { useToners } from "../context/TonerContext";
import TonerCard from "../components/TonerCard";
import { TextField, Button, Typography } from "@mui/material";
import { tempToners } from "../data/toners.js";

export default function Inventory() {
   // Commenting out for now while I work with temporary data
   //    const { toners, getToners, addToner, deleteToner } = useToners();

   const [model, setModel] = useState("");
   const [printer, setPrinter] = useState("");
   const [stock, setStock] = useState(0);

   useEffect(() => {
      // backend not implemented yet
      //   getToners();
   }, []);

   function handleAdd(e) {
      e.preventDefault();
      //   addToner({
      //      model,
      //      printers: printer.split(",").map((p) => p.trim()),
      //      stock: Number(stock),
      //   });
      // Reset form fields after adding
      setModel("");
      setPrinter("");
      setStock(0);
   }

   const displayedToners = tempToners; // Replace with 'toners' when backend is ready

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
            {displayedToners.map((toner) => (
               <TonerCard
                  key={toner.id}
                  toner={toner}
                  mode="inventory"
                  onDelete={() => alert("Delete not connected yet")}
               />
            ))}
         </div>
      </div>
   );
}
