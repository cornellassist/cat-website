/*
  Warnings:

  - You are about to drop the column `cta` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "cta",
ADD COLUMN     "ctaLink" TEXT,
ADD COLUMN     "ctaTitle" TEXT;
