-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "imageAlts" TEXT[] DEFAULT ARRAY[]::TEXT[];
