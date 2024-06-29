/*
  Warnings:

  - Added the required column `createdById` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "createdById" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "phone" SET DEFAULT 'Не указан';

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
