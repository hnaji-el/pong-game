/*
  Warnings:

  - You are about to drop the column `userLogin` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `userLogin` on the `muted` table. All the data in the column will be lost.
  - Added the required column `receiverUser` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverUser` to the `muted` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" DROP COLUMN "userLogin",
ADD COLUMN     "receiverUser" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "muted" DROP COLUMN "userLogin",
ADD COLUMN     "receiverUser" TEXT NOT NULL;
