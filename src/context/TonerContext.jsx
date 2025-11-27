import { useContext, createContext, useReducer } from "react";
import api from "../services/api";
import tonerReducer from "../reducers/tonerReducer";

const TonerContext = createContext();

export function TonerProvider({ children }) {
   const [state, dispatch] = useReducer(tonerReducer, { toners: [] });

   async function getToners() {
      const res = await api.get("/toners");
      dispatch({ type: "SET_TONERS", payload: res.data });
   }

   async function addToner(toner) {
      const res = await api.post("/toners", toner);
      dispatch({ type: "ADD_TONER", payload: res.data });
   }

   async function deleteToner(id) {
      await api.delete(`/toners/${id}`);
      dispatch({ type: "DELETE_TONER", payload: id });
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
