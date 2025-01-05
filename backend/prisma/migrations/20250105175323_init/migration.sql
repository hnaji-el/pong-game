/*
  Warnings:

  - You are about to drop the `Muted` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Muted" DROP CONSTRAINT "Muted_roomName_fkey";

-- DropTable
DROP TABLE "Muted";
