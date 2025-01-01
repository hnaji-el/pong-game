/*
  Warnings:

  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `muted` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_roomName_fkey";

-- DropForeignKey
ALTER TABLE "muted" DROP CONSTRAINT "muted_roomName_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "messages";

-- DropTable
DROP TABLE "muted";

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pictureURL" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Muted" (
    "id" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "receiverUser" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Muted_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "Room"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muted" ADD CONSTRAINT "Muted_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "Room"("name") ON DELETE CASCADE ON UPDATE CASCADE;
