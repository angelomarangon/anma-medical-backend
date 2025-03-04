/*
  Warnings:

  - You are about to drop the column `speciality` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `specialty` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "speciality",
ADD COLUMN     "specialty" TEXT NOT NULL;
