import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAuthContext } from "../interface/AuthContext.interface";
import { LOCAL_STORAGE_ACCESS_TOKEN } from "../contants/contants";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
  );

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, accessToken);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be within an AuthProvider");
  }

  return context;
}
