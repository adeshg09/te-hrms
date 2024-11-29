/*
  Warnings:

  - You are about to drop the column `attachmentName` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `attachmentType` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `EmergencyContactDetail` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNo` on the `EmergencyContactDetail` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `EmergencyContactDetail` table. All the data in the column will be lost.
  - You are about to drop the column `relation` on the `EmergencyContactDetail` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `FamilyDetail` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNo` on the `FamilyDetail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[designationName]` on the table `Designation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleName]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documentType` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentUrl` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submissionDate` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submitted` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactAddress` to the `EmergencyContactDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactName` to the `EmergencyContactDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `EmergencyContactDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationToEmployee` to the `EmergencyContactDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workingType` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthCountry` to the `FamilyDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthLocation` to the `FamilyDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthState` to the `FamilyDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentAddress` to the `FamilyDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `FamilyDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNumber` to the `FamilyDetail` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkingType" AS ENUM ('Office', 'Remote', 'Hybrid');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('DegreeCertificatesMarksheets', 'BirthProof', 'ExperienceCertificate', 'RelievingLetter', 'AadharPhotoCopy', 'PanPhotoCopy');

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "attachmentName",
DROP COLUMN "attachmentType",
DROP COLUMN "url",
ADD COLUMN     "documentType" "DocumentType" NOT NULL,
ADD COLUMN     "documentUrl" TEXT NOT NULL,
ADD COLUMN     "submissionDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "submitted" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "EmergencyContactDetail" DROP COLUMN "address",
DROP COLUMN "mobileNo",
DROP COLUMN "name",
DROP COLUMN "relation",
ADD COLUMN     "contactAddress" TEXT NOT NULL,
ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "relationToEmployee" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "employmentType" "EmploymentType" NOT NULL,
ADD COLUMN     "workingType" "WorkingType" NOT NULL;

-- AlterTable
ALTER TABLE "ExperienceDetail" ALTER COLUMN "endDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FamilyDetail" DROP COLUMN "dob",
DROP COLUMN "mobileNo",
ADD COLUMN     "birthCountry" TEXT NOT NULL,
ADD COLUMN     "birthLocation" TEXT NOT NULL,
ADD COLUMN     "birthState" TEXT NOT NULL,
ADD COLUMN     "currentAddress" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "mobileNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Designation_designationName_key" ON "Designation"("designationName");

-- CreateIndex
CREATE UNIQUE INDEX "Role_roleName_key" ON "Role"("roleName");
