-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_latestMessage_id_fkey";

-- AlterTable
ALTER TABLE "Conversation" ALTER COLUMN "latestMessage_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_latestMessage_id_fkey" FOREIGN KEY ("latestMessage_id") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;
