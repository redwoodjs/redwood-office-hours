/*
  Warnings:

  - Added the required column `timezone` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "timezone" TEXT NOT NULL;
