/*
  Warnings:

  - Made the column `roleDescription` on table `Role` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "roleDescription" SET NOT NULL;

-- CreateTable
CREATE TABLE "_FamilyDetailToPersonalDetail" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FamilyDetailToPersonalDetail_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EmergencyContactDetailToPersonalDetail" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EmergencyContactDetailToPersonalDetail_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FamilyDetailToPersonalDetail_B_index" ON "_FamilyDetailToPersonalDetail"("B");

-- CreateIndex
CREATE INDEX "_EmergencyContactDetailToPersonalDetail_B_index" ON "_EmergencyContactDetailToPersonalDetail"("B");

-- AddForeignKey
ALTER TABLE "_FamilyDetailToPersonalDetail" ADD CONSTRAINT "_FamilyDetailToPersonalDetail_A_fkey" FOREIGN KEY ("A") REFERENCES "FamilyDetail"("familyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FamilyDetailToPersonalDetail" ADD CONSTRAINT "_FamilyDetailToPersonalDetail_B_fkey" FOREIGN KEY ("B") REFERENCES "PersonalDetail"("personalDetailId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmergencyContactDetailToPersonalDetail" ADD CONSTRAINT "_EmergencyContactDetailToPersonalDetail_A_fkey" FOREIGN KEY ("A") REFERENCES "EmergencyContactDetail"("emergencyContactId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmergencyContactDetailToPersonalDetail" ADD CONSTRAINT "_EmergencyContactDetailToPersonalDetail_B_fkey" FOREIGN KEY ("B") REFERENCES "PersonalDetail"("personalDetailId") ON DELETE CASCADE ON UPDATE CASCADE;
