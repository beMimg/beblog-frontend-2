import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAuthContext } from "../interface/AuthContext.interface";
import { LOCAL_STORAGE_ACCESS_TOKEN } from "../contants/contants";
import { jwtDecode } from "jwt-decode";
import { ICustomJwtPayload } from "../interface/CustomJwtPayload";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
  );
  const [userRole, setUserRole] = useState<string | undefined>();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, accessToken);
      try {
        const decode = jwtDecode<ICustomJwtPayload>(accessToken);
        setUserRole(decode.role);
      } catch (err) {
        console.error("Failed to decode token:", err);
        setUserRole("");
      }
    } else {
      localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
      setUserRole("");
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, userRole, setUserRole }}
    >
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
