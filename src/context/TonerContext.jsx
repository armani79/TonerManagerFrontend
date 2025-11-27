import { useContext, createContext, useReducer } from "react";
// import api from "../services/api";
import tonerReducer from "../reducers/tonerReducer";

const TonerContext = createContext();

export function TonerProvider({ children }) {
   const [state, dispatch] = useReducer(tonerReducer, { toners: [] });

   async function getToners() {
      try {
         const res = await api.get("/toners");
         dispatch({ type: "SET_TONERS", payload: res.data });
      } catch (error) {
         console.error("Failed to fetch toners:", error);
      }
   }

   async function addToner(toner) {
      try {
         const res = await api.post("/toners", toner);
         dispatch({ type: "ADD_TONER", payload: res.data });
      } catch (error) {
         console.error("Failed to add toner:", error);
      }
   }

   async function deleteToner(id) {
      try {
         await api.delete(`/toners/${id}`);
         dispatch({ type: "DELETE_TONER", payload: id });
      } catch (error) {
         console.error("Failed to delete toner:", error);
      }
   }

   return (
      <TonerContext.Provider
         value={{ toners: state.toners, getToners, addToner, deleteToner }}
      >
         {children}
      </TonerContext.Provider>
   );
}

export function useToner() {
   return useContext(TonerContext);
}
