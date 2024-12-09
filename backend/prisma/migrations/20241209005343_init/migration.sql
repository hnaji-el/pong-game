/*
  Warnings:

  - You are about to drop the column `hash` on the `Room` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('DIRECTMESSAGE', 'PUBLIC', 'PROTECTED', 'PRIVATE');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "hash",
ADD COLUMN     "hashedPassword" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "RoomType" NOT NULL;
