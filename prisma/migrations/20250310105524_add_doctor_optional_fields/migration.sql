/*
  Warnings:

  - You are about to drop the column `birthdate` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `documentId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `medicalLicense` on the `Doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "birthdate",
DROP COLUMN "documentId",
DROP COLUMN "imageUrl",
DROP COLUMN "medicalLicense",
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "identityNumber" TEXT,
ADD COLUMN     "licenseNumber" TEXT,
ADD COLUMN     "profileImage" TEXT;
