export interface IAuthContext {
  userRole: string | undefined;
  setUserRole: React.Dispatch<React.SetStateAction<string | undefined>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}
