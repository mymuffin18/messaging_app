-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "channelUrl" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "chatmate" TEXT NOT NULL,
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_channelUrl_key" ON "Channel"("channelUrl");
