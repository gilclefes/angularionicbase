export interface LoginResult {
  success: boolean;
  message: string;
  token?: string;
  username?: string;
  email: string;
  roles: string[];
}
