/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role = 'Admin' | 'Student' | 'Staff' | 'Guest';

export type AlertCategory = 'Emergency' | 'Academic' | 'Health' | 'Security' | 'General';

export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';

export type TargetAudience = 'All' | 'Students Only' | 'Staff Only' | 'Department-specific';

export type AlertStatus = 'Active' | 'Resolved' | 'Deleted' | 'Scheduled';

export interface Alert {
  id: string;
  title: string;
  category: AlertCategory;
  severity: Severity;
  targetAudience: TargetAudience;
  message: string;
  channels: ('In-App' | 'Email' | 'SMS')[];
  createdAt: string;
  scheduledAt?: string;
  status: AlertStatus;
  sentBy: string;
  acknowledgedBy?: string[]; // User IDs
}

export interface User {
  id: string;
  name: string;
  role: Role;
  department: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
  idNumber: string;
}

export interface NotificationPreference {
  category: AlertCategory;
  channels: {
    inApp: boolean;
    email: boolean;
    sms: boolean;
  };
}
