export interface IUser {
  id?: string;
  name: string;
  email: string;
  role: "ADMIN";
  iat?: number;
  exp?: number;
}