import { z } from 'zod';

import {
  basicDetailsSchema,
  createDesignationSchema,
  createEmployeeSchema,
  createRoleSchema,
  documentUrlsSchema,
  educationalDetailsSchema,
  forgotPasswordSchema,
  loginSchema,
  ResetPasswordSchema,
  addressDetailsSchema,
  familyDetailsSchema,
  emergencyContactDetailsSchema,
  profBasicDetailsSchema,
  experienceDetailsSchema,
} from '@/lib/validations';

// Schema Inferences
// These types are inferred from the respective Zod schemas

// Auth form schemas types
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

// Create role and designation form schemas type
export type DesignationFormData = z.infer<typeof createDesignationSchema>;
export type RoleFormData = z.infer<typeof createRoleSchema>;

// Create employee form schemas type
export type EmployeeFormData = z.infer<typeof createEmployeeSchema>;

// Personal details section forms types
export type BasicDetailsFormData = z.infer<typeof basicDetailsSchema>;
export type EducationDetailsFormData = z.infer<typeof educationalDetailsSchema>;
export type AddressDetailsFormData = z.infer<typeof addressDetailsSchema>;
export type FamilyDetailsFormData = z.infer<typeof familyDetailsSchema>;
export type EmergencyContactDetailsFormData = z.infer<typeof emergencyContactDetailsSchema>;

// Professional details section forms types
export type ProfBasicDetailsFormData = z.infer<typeof profBasicDetailsSchema>;
export type ExperienceDetailsFormData = z.infer<typeof experienceDetailsSchema>;

// Document upload section forms types
export type DocumentUpload = z.infer<typeof documentUrlsSchema>;

// Form Steps Types
// Types representing the steps in the multi-step form
export type MainStep = 'Personal Details' | 'Professional Details' | 'Documents';
export type PersonalDetailsSubStep =
  | 'Basic Details'
  | 'Educational Details'
  | 'Address Details'
  | 'Family Details'
  | 'Emergency Contact Details';
export type ProfessionalDetailsSubStep =
  'Basic Details' | 'Experience Details';

// Step Item Interface
// Interface representing an item in the step navigation

export interface StepItem {
  label: string;
  icon: React.ReactNode;
}

// Multi-Step Form Context Type
// Type representing the context for the multi-step form

export interface MultiStepFormContextType {
  activeStep: MainStep;
  currentSubStep: number;
  isMobileMenuOpen: boolean;
  formData: Partial<{
    basicDetails?: BasicDetailsFormData;
    educationalDetails?: EducationDetailsFormData[];
    addressDetails?: AddressDetailsFormData[];
    familyDetails?: FamilyDetailsFormData[];
    emergencyContactDetails?: EmergencyContactDetailsFormData[];
    profBasicDetails?: ProfBasicDetailsFormData;
    experienceDetails?: ExperienceDetailsFormData[];
    documentUpload?: DocumentUpload[];
  }>;
  setActiveStep: React.Dispatch<React.SetStateAction<MainStep>>;
  setCurrentSubStep: React.Dispatch<React.SetStateAction<number>>;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateFormData: (
    newData: Partial<{
      basicDetails?: BasicDetailsFormData;
      educationalDetails?: EducationDetailsFormData[]; // Changed to array
      addressDetails?: AddressDetailsFormData[];
      familyDetails?: FamilyDetailsFormData[];
      emergencyContactDetails?: EmergencyContactDetailsFormData[];
      profBasicDetails?: ProfBasicDetailsFormData;
      experienceDetails?: ExperienceDetailsFormData[];
      documentUpload?: DocumentUpload[];
    }>
  ) => void;
}