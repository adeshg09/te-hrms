import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean(),
});

export const forgotPasswordSchema = z.object({
  emailId: z.string().email('Invalid email format'),
});

export const ResetPasswordSchema = z.object({
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export const createRoleSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
});

export const createDesignationSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
});

export const basicDetailsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  mobileNo: z.string().min(10, 'Mobile number must be at least 10 digits'),
  emailId: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  profileUrl: z.string().url('Invalid URL format'),
  roles: z
  .array(
    z.object({
      roleId: z.number().min(1, 'Role ID must be a valid number'),
    })
  )
  .optional(),
  isActive: z.boolean().default(true),
  showActivity: z.boolean().default(true),
  dateOfBirth: z.string().transform((val) => new Date(val)),
  age: z.number().min(18, 'Age must be at least 18'),
  gender: z.enum(['Male', 'Female', 'Other']),
  maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed']),
  dateOfMarriage: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)).optional(),
  bloodGroup: z.enum([
    'APlus',
    'AMinus',
    'BPlus',
    'BMinus',
    'ABPlus',
    'ABMinus',
    'OPlus',
    'OMinus',
  ]),
  birthCountry: z.string().min(1, 'Birth country is required'),
  birthState: z.string().min(1, 'Birth state is required'),
  birthLocation: z.string().min(1, 'Birth location is required'),
  panNo: z.string().min(10, 'PAN number must be 10 characters'),
  caste: z.string().min(1, 'Caste is required'),
  religion: z.string().min(1, 'Religion is required'),
  domicile: z.string().min(1, 'Domicile is required'),
});

export const addressDetailsSchema = z.object({
  addressType: z.enum(['Present', 'Permanent']),
  buildingName: z.string().min(1, 'Building name is required'),
  flatNumber: z.string().min(1, 'Flat number is required'),
  streetName: z.string().min(1, 'Street name is required'),
  landmark: z.string().min(1, 'Landmark is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(6, 'Pincode must be 6 digits'),
  telephoneNumber: z.string().optional(),
  mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits'),
});

export const educationalDetailsSchema = z.object({
  course: z.enum([
    'Std10th',
    'Std12th',
    'Graduation',
    'PostGraduation',
    'Others',
  ]),
  degreeSpecialization: z.string().min(1, 'Specialization is required'),
  instituteUniversityName: z.string().min(1, 'Institute name is required'),
  fromDate: z.string().transform((val) => new Date(val)),
  toDate: z.string().transform((val) => new Date(val)),
  status: z.enum(['Completed', 'InProcess', 'Dropped']),
  studyMode: z.enum(['FullTime', 'Correspondence', 'PartTime']),
  percentage: z.number().min(0, 'Percentage must be a positive number'),
});

export const familyDetailsSchema = z.object({
  relationType: z.enum([
    'Father',
    'Mother',
    'Brother',
    'Sister',
    'Spouse',
    'Other',
  ]),
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(1, 'Age must be a positive number'),
  dateOfBirth: z.string().transform((val) => new Date(val)),
  currentAddress: z.string().min(1, 'Current address is required'),
  birthCountry: z.string().min(1, 'Birth country is required'),
  birthState: z.string().min(1, 'Birth state is required'),
  birthLocation: z.string().min(1, 'Birth location is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  mobileNo: z.string().min(10, 'Mobile number must be at least 10 digits'),
});

export const emergencyContactDetailsSchema = z.object({
  contactName: z.string().min(1, 'Contact name is required'),
  contactAddress: z.string().min(1, 'Contact address is required'),
  relationToEmployee: z.string().min(1, 'Relation to employee is required'),
  contactNumber: z
    .string()
    .min(10, 'Contact number must be at least 10 digits'),
});

export const profBasicDetailsSchema = z.object({
  designation: z.string().min(1, 'Designation is required'),
  employmentType: z.enum(['FullTime', 'PartTime', 'Internship']),
  workingType: z.enum(['Office', 'Remote', 'Hybrid']),
  dateOfJoin: z.string().transform((val) => new Date(val)),
  signatureUrl: z.string().url('Invalid URL format'),
});

export const experienceDetailsSchema = z.object({
  empName: z.string().min(1, 'Employer name is required'),
  empId: z.string().min(1, 'Employer ID is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  startDate: z.string().transform((val) => new Date(val)),
  endDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  employmentType: z.enum(['FullTime', 'PartTime', 'Internship']),
  supervisorName: z.string().optional(),
  supervisorMobNo: z.string().optional(),
});

export const documentUrlsSchema = z.object({
  documentType: z.enum([
    'DegreeCertificatesMarksheets',
    'BirthProof',
    'ExperienceCertificate',
    'RelievingLetter',
    'AadharPhotoCopy',
    'PanPhotoCopy',
  ]),
  documentUrl: z.string().url('Invalid document URL'),
  submitted: z.boolean(),
  submissionDate: z.string().transform((val) => new Date(val)),
});

// Main schema
export const createEmployeeSchema = z.object({
  personalDetails: z.object({
    basicDetails: basicDetailsSchema,
    addressDetails: z.array(addressDetailsSchema),
    educationalDetails: z.array(educationalDetailsSchema),
    familyDetails: z.array(familyDetailsSchema),
    emergencyContactDetails: emergencyContactDetailsSchema,
  }),
  professionalDetails: z.object({
    basicDetails: profBasicDetailsSchema,
    experienceDetails: z.array(experienceDetailsSchema),
  }),
  documentUrls: z.array(documentUrlsSchema),
});
