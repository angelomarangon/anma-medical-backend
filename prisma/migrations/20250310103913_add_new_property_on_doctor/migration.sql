-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "address" TEXT,
ADD COLUMN     "availableHours" JSONB,
ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "city" TEXT,
ADD COLUMN     "documentId" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "medicalLicense" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "phone" TEXT;
