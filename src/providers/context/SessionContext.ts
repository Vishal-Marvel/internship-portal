
import { createContext, useContext } from "react";

interface SessionContextType {
  token: string | null;
  role: string | null;
  isPasswordDefault: boolean | null;
  changePasswordNotDefault: ()=>void;
  setSession: (token: string, role:string) => void;
  clearSession: () => void;
  isTokenExpired: () => boolean| null;
}

export const SessionContext = createContext<SessionContextType>({
  token: null,
  role: null,
  isPasswordDefault: null,
  changePasswordNotDefault: ()=>{},
  setSession: () => {},
  clearSession: () => {},
  isTokenExpired: () => false,
});

export const useSession = () => useContext(SessionContext);
