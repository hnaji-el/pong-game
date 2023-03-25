/*
  Warnings:

  - You are about to drop the `room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_roomName_fkey";

-- DropForeignKey
ALTER TABLE "muted" DROP CONSTRAINT "muted_roomName_fkey";

-- DropTable
DROP TABLE "room";

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "members" TEXT[],
    "blocked" TEXT[],
    "type" TEXT NOT NULL DEFAULT 'private',
    "admins" TEXT[],
    "hash" TEXT,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");

-- AddForeignKey
ALTER TABLE "muted" ADD CONSTRAINT "muted_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "Room"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "Room"("name") ON DELETE CASCADE ON UPDATE CASCADE;
