import { useState } from "react";
import {
   Card,
   CardContent,
   Typography,
   CardActions,
   Button,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
} from "@mui/material";

export default function TonerCard({ toner }) {
   const [qty, setQty] = useState(1);

   const handleAdd = () => {
      console.log("Add to cart", { ...toner, qty });
   };

   return (
      <Card sx={{ width: 260, boxShadow: 3, borderRadius: 2 }}>
         <CardContent>
            <Typography variant="h6">{toner.model}</Typography>
            <Typography color="text.secondary">{toner.printer}</Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}></Typography>

            <FormControl fullWidth sx={{ mt: 2 }}>
               <InputLabel id="qty-label">Qty</InputLabel>
               <Select
                  labelId="qty-label"
                  value={qty}
                  label="Qty"
                  onChange={(e) => setQty(Number(e.target.value))}
               >
                  {[...Array(toner.stock).keys()].map((i) => (
                     <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </CardContent>

         <CardActions>
            <Button
               size="small"
               variant="contained"
               color="primary"
               onClick={handleAdd}
               disabled={toner.stock === 0}
            >
               {toner.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
         </CardActions>
      </Card>
   );
}
