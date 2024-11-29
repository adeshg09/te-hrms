-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordToken" TEXT,
ADD COLUMN     "resetPasswordTokenExpiry" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "_AddressToPersonalDetail" ADD CONSTRAINT "_AddressToPersonalDetail_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_AddressToPersonalDetail_AB_unique";

-- AlterTable
ALTER TABLE "_EducationalDetailToPersonalDetail" ADD CONSTRAINT "_EducationalDetailToPersonalDetail_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_EducationalDetailToPersonalDetail_AB_unique";

-- AlterTable
ALTER TABLE "_ExperienceDetailToProfessionalDetail" ADD CONSTRAINT "_ExperienceDetailToProfessionalDetail_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ExperienceDetailToProfessionalDetail_AB_unique";
