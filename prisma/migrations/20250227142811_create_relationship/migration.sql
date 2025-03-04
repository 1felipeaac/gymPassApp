/*
  Warnings:

  - Added the required column `gy_mId` to the `check_ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_Id` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check_ins" ADD COLUMN     "gy_mId" TEXT NOT NULL,
ADD COLUMN     "user_Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_gy_mId_fkey" FOREIGN KEY ("gy_mId") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
