export type Role = 'Admin' ;

export interface LoginFormData{
  email:string;
  password:string;
  role?:Role;
 }