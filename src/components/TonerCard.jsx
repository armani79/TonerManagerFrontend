import { useState } from "react";
import {
   Card,
   CardContent,
   CardActions,
   Typography,
   Button,
   Checkbox,
} from "@mui/material";

export default function TonerCard({
   toner,
   mode = "inventory",
   onDelete,
   onSelect,
   selected = false,
}) {
   return (
      <Card
         sx={{
            width: 260,
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
            <Typography color="text.secondary">{toner.printer}</Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
               Stock: {toner.stock}
            </Typography>
         </CardContent>
         <CardActions sx={{ justifyContent: "space-between" }}>
            {mode === "checkout" && (
               <Checkbox
                  checked={selected}
                  onChange={(e) => onSelect(toner.id, e.target.checked)}
               />
            )}

            {mode === "inventory" && (
               <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(toner.id)}
               >
                  Delete
               </Button>
            )}
            <Button
               size="small"
               variant="contained"
               onClick={() => (window.location.href = `/toner/${toner.id}`)}
            >
               {" "}
               Detials{" "}
            </Button>
         </CardActions>
      </Card>
   );
}
