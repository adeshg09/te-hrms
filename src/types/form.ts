import { basicDetailsSchema, createDesignationSchema, createEmployeeSchema, createRoleSchema, documentUrlsSchema, educationalDetailsSchema, forgotPasswordSchema, loginSchema, ResetPasswordSchema } from "@/lib/validations"
import { z } from "zod"

export type LoginFormData = z.infer<typeof loginSchema>
export type forgotPasswordFormData=z.infer< typeof forgotPasswordSchema>
export type ResetPasswordFormData=z.infer< typeof ResetPasswordSchema>
export type DesignationFormData=z.infer<typeof createDesignationSchema>
export type RoleFormData=z.infer<typeof createRoleSchema>
export type EmployeeFormData=z.infer<typeof createEmployeeSchema>
export type DocumentUpload=z.infer<typeof documentUrlsSchema>
export type basicDetailsFormData=z.infer<typeof basicDetailsSchema>
export type educationDetailsFormData=z.infer<typeof educationalDetailsSchema>
export type MainStep = 'Personal Details' | 'Professional Details' | 'Documents';

export type PersonalDetailsSubStep =
  | 'Basic Details'
  | 'Educational Details'
  | 'Address Details'
  | 'Family Details'
  | 'Emergency Contact Details';

export type ProfessionalDetailsSubStep = 
  'Basic Details' | 'Experience Details';

export interface StepItem {
  label: string;
  icon: React.ReactNode;
}

export interface MultiStepFormContextType {
  activeStep: MainStep;
  currentSubStep: number;
  isMobileMenuOpen: boolean;
  setActiveStep: (step: MainStep) => void;
  setCurrentSubStep: (subStep: number) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
}
