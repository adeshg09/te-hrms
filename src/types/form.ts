import { createDesignationSchema, createEmployeeSchema, createRoleSchema, documentUrlsSchema, forgotPasswordSchema, loginSchema, ResetPasswordSchema } from "@/lib/validations"
import { z } from "zod"

export type LoginFormData = z.infer<typeof loginSchema>
export type forgotPasswordFormData=z.infer< typeof forgotPasswordSchema>
export type ResetPasswordFormData=z.infer< typeof ResetPasswordSchema>
export type DesignationFormData=z.infer<typeof createDesignationSchema>
export type RoleFormData=z.infer<typeof createRoleSchema>
export type EmployeeFormData=z.infer<typeof createEmployeeSchema>
export type DocumentUpload=z.infer<typeof documentUrlsSchema>