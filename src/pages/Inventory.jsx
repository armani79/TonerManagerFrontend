import { useEffect, useState } from "react";
import { useToners } from "../context/TonerContext";
import TonerCard from "../components/TonerCard";
import { TextField, Button } from "../components/TonerCard";

export default function Inventory() {
   const { toners, getToners, addToner, deleteToner } = useToners();

   const [model, setModel] = useState("");
   const [printer, setPrinter] = useState("");
   const [stock, setStock] = useState(0);

   useEffect(() => {
      getToners();
   }, []);
}
