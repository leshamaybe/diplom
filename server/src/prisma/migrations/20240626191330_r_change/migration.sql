-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_messageId_fkey";

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
