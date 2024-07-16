import { IUserInfo } from "./UserInfo.interface";

export interface IAuthContext {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  userInfo: IUserInfo | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
}
