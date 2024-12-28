/*
  Warnings:

  - You are about to drop the column `receiverUser` on the `messages` table. All the data in the column will be lost.
  - Added the required column `userId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" DROP COLUMN "receiverUser",
ADD COLUMN     "userId" TEXT NOT NULL;
