import { useContext, createContext, useReducer } from "react";
import api from "../services/api";
import tonerReducer from "../reducers/tonerReducer";

const TonerContext = createContext();
