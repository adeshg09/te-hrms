import { Employee, User } from '@prisma/client';

export interface ThemeOption {
  label: string;
  value: string;
  icon: string;
}

export type JWTPayload = {
  user: User;
  isRemembered: boolean;
};
export type resetJWTPayload = {
  emailId: string;
  action: string;
};

export type Role = {
  roleId: number;
  roleName: string;
  roleDescription: string;
};

export type Designation = {
  designationId: number;
  designationName: string;
  designationDescription: string | null;
  // employees:User[]
};

