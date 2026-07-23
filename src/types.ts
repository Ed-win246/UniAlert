export type Role ='Student' | 'Staff' | 'Guest' | 'Admin';

export type AlertCategory = 'Emergency' | 'Academic' | 'General' | 'Health' | 'Security';
export type AlertSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type AlertStatus = 'Active' | 'Resolved' | 'Draft';
export type TargetAudience = 'All' | 'Students' | 'Staff' | 'Guests';

export interface User {
  id: string;
  name: string;
  role: Role;
  department: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  idNumber: string;
}

export interface Alert {
  id: string;
  title: string;
  category: AlertCategory;
  severity: AlertSeverity;
  targetAudience: string;
  message: string;
  channels: string[];
  createdAt: string;
  status: AlertStatus;
  sentBy: string;
  acknowledgedBy?: string[];
}
//handling the error messages for the login form
export interface LoginFormErrors{
  email?:string;
  password?:string;
  role?:string;
  general:string;
}
 export interface LoginFormData{
  email:string;
  password:string;
  role?:Role;
 }