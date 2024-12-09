/*
  Warnings:

  - The primary key for the `Game` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gameId` on the `Game` table. All the data in the column will be lost.
  - The required column `id` was added to the `Game` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Game" DROP CONSTRAINT "Game_pkey",
DROP COLUMN "gameId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Game_pkey" PRIMARY KEY ("id");
