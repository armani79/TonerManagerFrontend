import {
   Button,
   CardContent,
   Card,
   TextField,
   Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function EditToner() {
   const { id } = useParams();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);

   const [form, setForm] = useState({
      model: "",
      color: "",
      printers: "",
      stock: 0,
   });

   useEffect(() => {
      async function fetchToner() {
         try {
            const res = await api.get("/toners");
            const toner = res.data.find((t) => t.id === Number(id));

            if (!toner) return;

            setForm({
               model: toner.model,
               color: toner.color,
               printers: Array.isArray(toner.printers)
                  ? toner.printers.join(", ")
                  : toner.printers,
               stock: toner.stock,
            });
         } catch (error) {
            console.error(error);
         } finally {
            setLoading(false);
         }
      }
      fetchToner();
   }, [id]);

   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }

   async function handleSave() {
      try {
         await api.put(`/toners/${id}`, {
            model: form.model,
            color: form.color,
            printers: form.printers.split(",").map((p) => p.trim()),
            stock: Number(form.stock),
         });
         navigate(`/toner/${id}`);
      } catch (error) {
         console.error(error);
         alert("Failed to update toner");
      }
   }

   if (loading) {
      return (
         <Typography variant="h4" padding={20}>
            Loading toner...
         </Typography>
      );
   }

   return (
      <div>
         {" "}
         <Card>
            {" "}
            <CardContent>
               {" "}
               <Typography> Edit Toner </Typography>
               <TextField
                  label="Model"
                  name="model"
                  fullWidth
                  margin="normal"
                  value={form.model}
                  onChange={handleChange}
               />
               <TextField
                  label="Color"
                  name="color"
                  fullWidth
                  margin="normal"
                  value={form.color}
                  onChange={handleChange}
               />
               <TextField
                  label="Compatible Printers"
                  name="printers"
                  fullWidth
                  margin="normal"
                  value={form.printers}
                  onChange={handleChange}
               />
               <TextField
                  label="Stock"
                  name="stock"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={form.stock}
                  onChange={handleChange}
               />
               <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
                  Save Changes
               </Button>
               <Button
                  variant="text"
                  sx={{ mt: 2, ml: 2 }}
                  onClick={() => navigate(`/toner/${id}`)}
               >
                  Cancel
               </Button>
            </CardContent>
         </Card>
      </div>
   );
}
