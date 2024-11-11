import { createContext } from "react";
import { AuthContextType } from "../types";

/**
 * Context for managing authentication-related state and functions.
 */
export const AuthContext = createContext({} as AuthContextType);
