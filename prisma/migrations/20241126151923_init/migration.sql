-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('Single', 'Married', 'Divorced', 'Widowed');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('APlus', 'AMinus', 'BPlus', 'BMinus', 'ABPlus', 'ABMinus', 'OPlus', 'OMinus');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('Present', 'Permanent');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('Std10th', 'Std12th', 'Graduation', 'PostGraduation', 'Others');

-- CreateEnum
CREATE TYPE "EducationStatus" AS ENUM ('Completed', 'InProcess', 'Dropped');

-- CreateEnum
CREATE TYPE "StudyMode" AS ENUM ('FullTime', 'Correspondence', 'PartTime');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FullTime', 'PartTime', 'Internship');

-- CreateEnum
CREATE TYPE "FamilyRelation" AS ENUM ('Father', 'Mother', 'Brother', 'Sister', 'Spouse', 'Other');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "showActivity" BOOLEAN NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "reset_token" TEXT,
    "reset_token_expires" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Employee" (
    "employeeId" SERIAL NOT NULL,
    "designationId" INTEGER NOT NULL,
    "dateOfJoin" TIMESTAMP(3) NOT NULL,
    "signatureUrl" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeId")
);

-- CreateTable
CREATE TABLE "Role" (
    "roleId" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,
    "roleDescription" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "userRoleId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userRoleId")
);

-- CreateTable
CREATE TABLE "Designation" (
    "designationId" SERIAL NOT NULL,
    "designationName" TEXT NOT NULL,
    "designationDescription" TEXT,

    CONSTRAINT "Designation_pkey" PRIMARY KEY ("designationId")
);

-- CreateTable
CREATE TABLE "PersonalDetail" (
    "personalDetailId" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "age" INTEGER NOT NULL,
    "birthCountry" TEXT NOT NULL,
    "birthState" TEXT NOT NULL,
    "birthLocation" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "dateOfMarriage" TIMESTAMP(3),
    "bloodGroup" "BloodGroup" NOT NULL,
    "panNo" TEXT NOT NULL,
    "caste" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "domicile" TEXT NOT NULL,

    CONSTRAINT "PersonalDetail_pkey" PRIMARY KEY ("personalDetailId")
);

-- CreateTable
CREATE TABLE "ProfessionalDetail" (
    "professionalDetailId" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "ProfessionalDetail_pkey" PRIMARY KEY ("professionalDetailId")
);

-- CreateTable
CREATE TABLE "Address" (
    "addressId" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "addressType" "AddressType" NOT NULL,
    "buildingName" TEXT NOT NULL,
    "flatNumber" TEXT NOT NULL,
    "streetName" TEXT NOT NULL,
    "landmark" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "telephoneNumber" TEXT,
    "mobileNumber" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressId")
);

-- CreateTable
CREATE TABLE "EducationalDetail" (
    "educationId" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "course" "CourseType" NOT NULL,
    "degreeSpecialization" TEXT NOT NULL,
    "instituteUniversityName" TEXT NOT NULL,
    "fromDate" TIMESTAMP(3) NOT NULL,
    "toDate" TIMESTAMP(3) NOT NULL,
    "status" "EducationStatus" NOT NULL,
    "studyMode" "StudyMode" NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EducationalDetail_pkey" PRIMARY KEY ("educationId")
);

-- CreateTable
CREATE TABLE "ExperienceDetail" (
    "experienceId" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "empName" TEXT NOT NULL,
    "empId" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "employmentType" "EmploymentType" NOT NULL,
    "supervisorName" TEXT,
    "supervisorMobNo" TEXT,

    CONSTRAINT "ExperienceDetail_pkey" PRIMARY KEY ("experienceId")
);

-- CreateTable
CREATE TABLE "FamilyDetail" (
    "familyId" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "relationType" "FamilyRelation" NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "occupation" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,

    CONSTRAINT "FamilyDetail_pkey" PRIMARY KEY ("familyId")
);

-- CreateTable
CREATE TABLE "EmergencyContactDetail" (
    "emergencyContactId" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "EmergencyContactDetail_pkey" PRIMARY KEY ("emergencyContactId")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "attachmentId" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "attachmentName" TEXT NOT NULL,
    "attachmentType" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("attachmentId")
);

-- CreateTable
CREATE TABLE "_AddressToPersonalDetail" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EducationalDetailToPersonalDetail" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExperienceDetailToProfessionalDetail" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailId_key" ON "User"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetail_employeeId_key" ON "PersonalDetail"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToPersonalDetail_AB_unique" ON "_AddressToPersonalDetail"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToPersonalDetail_B_index" ON "_AddressToPersonalDetail"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EducationalDetailToPersonalDetail_AB_unique" ON "_EducationalDetailToPersonalDetail"("A", "B");

-- CreateIndex
CREATE INDEX "_EducationalDetailToPersonalDetail_B_index" ON "_EducationalDetailToPersonalDetail"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExperienceDetailToProfessionalDetail_AB_unique" ON "_ExperienceDetailToProfessionalDetail"("A", "B");

-- CreateIndex
CREATE INDEX "_ExperienceDetailToProfessionalDetail_B_index" ON "_ExperienceDetailToProfessionalDetail"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "Designation"("designationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalDetail" ADD CONSTRAINT "PersonalDetail_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationalDetail" ADD CONSTRAINT "EducationalDetail_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceDetail" ADD CONSTRAINT "ExperienceDetail_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyDetail" ADD CONSTRAINT "FamilyDetail_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContactDetail" ADD CONSTRAINT "EmergencyContactDetail_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToPersonalDetail" ADD CONSTRAINT "_AddressToPersonalDetail_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("addressId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToPersonalDetail" ADD CONSTRAINT "_AddressToPersonalDetail_B_fkey" FOREIGN KEY ("B") REFERENCES "PersonalDetail"("personalDetailId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EducationalDetailToPersonalDetail" ADD CONSTRAINT "_EducationalDetailToPersonalDetail_A_fkey" FOREIGN KEY ("A") REFERENCES "EducationalDetail"("educationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EducationalDetailToPersonalDetail" ADD CONSTRAINT "_EducationalDetailToPersonalDetail_B_fkey" FOREIGN KEY ("B") REFERENCES "PersonalDetail"("personalDetailId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceDetailToProfessionalDetail" ADD CONSTRAINT "_ExperienceDetailToProfessionalDetail_A_fkey" FOREIGN KEY ("A") REFERENCES "ExperienceDetail"("experienceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExperienceDetailToProfessionalDetail" ADD CONSTRAINT "_ExperienceDetailToProfessionalDetail_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfessionalDetail"("professionalDetailId") ON DELETE CASCADE ON UPDATE CASCADE;
