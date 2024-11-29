/*
  Warnings:

  - You are about to drop the column `reset_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `reset_token_expires` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_employeeId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "reset_token",
DROP COLUMN "reset_token_expires",
ALTER COLUMN "employeeId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_employeeId_key" ON "User"("employeeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE SET NULL ON UPDATE CASCADE;
