/*
  Warnings:

  - A unique constraint covering the columns `[group_id]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "group_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_group_id_key" ON "Conversation"("group_id");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
