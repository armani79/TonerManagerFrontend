import {
   Card,
   CardContent,
   CardActions,
   Typography,
   Button,
   Checkbox,
   TextField,
} from "@mui/material";

import { useState } from "react";

export default function TonerCard({
   toner,
   mode = "inventory",
   onDelete,
   onCheckout,
   onSelect,
   selected = false,
}) {
   const [qty, setQty] = useState(1);

   return (
      <Card
         sx={{
            width: 500,
            borderRadius: 2,
            boxShadow: 3,
            padding: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
         }}
      >
         <CardContent>
            <Typography variant="h6">{toner.model}</Typography>
            <Typography color="text.secondary">
               Compatible Printers:{" "}
               {Array.isArray(toner.printers)
                  ? toner.printers.join(", ")
                  : toner.printers}
            </Typography>
            <Typography color="text.secondary">Color: {toner.color}</Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
               Stock:{" "}
               <span style={{ color: toner.stock <= 2 ? "red" : "inherit" }}>
                  {" "}
                  {toner.stock}{" "}
               </span>
            </Typography>
         </CardContent>
         <CardActions sx={{ justifyContent: "space-between" }}>
            {mode === "inventory" && (
               <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(toner.id)}
               >
                  Delete
               </Button>
            )}

            {mode === "checkout" && (
               <>
                  <TextField
                     label="Qty"
                     type="number"
                     size="small"
                     value={qty}
                     onChange={(e) => setQty(Number(e.target.value))}
                     inputProps={{ min: 1 }}
                     sx={{ width: 80 }}
                  />
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={() => onCheckout(toner.id, qty)}
                  >
                     Checkout
                  </Button>
               </>
            )}
            <Button
               size="small"
               variant="contained"
               onClick={() => (window.location.href = `/toner/${toner.id}`)}
            >
               {" "}
               Details{" "}
            </Button>
         </CardActions>
      </Card>
   );
}
