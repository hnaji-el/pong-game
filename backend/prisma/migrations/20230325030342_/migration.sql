-- CreateEnum
CREATE TYPE "Status" AS ENUM ('FRIENDSHIP', 'BLOCK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "pictureURL" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'offline',
    "firstTimeLogged" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelationShip" (
    "id" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "addresseeId" TEXT NOT NULL,
    "type" "Status" NOT NULL,

    CONSTRAINT "RelationShip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "members" TEXT[],
    "blocked" TEXT[],
    "type" TEXT NOT NULL DEFAULT 'private',
    "admins" TEXT[],
    "hash" TEXT,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muted" (
    "id" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "userLogin" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "muted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "userLogin" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_name_key" ON "rooms"("name");

-- AddForeignKey
ALTER TABLE "RelationShip" ADD CONSTRAINT "RelationShip_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationShip" ADD CONSTRAINT "RelationShip_addresseeId_fkey" FOREIGN KEY ("addresseeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muted" ADD CONSTRAINT "muted_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "rooms"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "rooms"("name") ON DELETE CASCADE ON UPDATE CASCADE;
