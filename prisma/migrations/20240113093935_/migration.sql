-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "profileUrl" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_identifier_key" ON "User"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
