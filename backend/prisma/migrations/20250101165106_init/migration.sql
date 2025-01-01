-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Muted" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMPTZ;
