import { Container, Grid } from "@mui/material";
import TonerCard from "./components/TonerCard";
import { tonerData } from "./data/toners";

function App() {
   return (
      <Container>
         <Grid container spacing={4}>
            {tonerData.map((toner) => (
               <Grid item key={toner.id}>
                  <TonerCard toner={toner} />
               </Grid>
            ))}
         </Grid>
      </Container>
   );
}

export default App;
