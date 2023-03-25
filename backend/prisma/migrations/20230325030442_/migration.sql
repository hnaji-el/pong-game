/*
  Warnings:

  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_roomName_fkey";

-- DropForeignKey
ALTER TABLE "muted" DROP CONSTRAINT "muted_roomName_fkey";

-- DropTable
DROP TABLE "rooms";

-- CreateTable
CREATE TABLE "room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "members" TEXT[],
    "blocked" TEXT[],
    "type" TEXT NOT NULL DEFAULT 'private',
    "admins" TEXT[],
    "hash" TEXT,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "room_name_key" ON "room"("name");

-- AddForeignKey
ALTER TABLE "muted" ADD CONSTRAINT "muted_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "room"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "room"("name") ON DELETE CASCADE ON UPDATE CASCADE;
