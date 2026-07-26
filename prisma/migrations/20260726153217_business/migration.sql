/*
  Warnings:

  - The values [OPERATIONS,OPERATIONS_LEADS] on the enum `MemberRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MemberRole_new" AS ENUM ('TEAM_LEADS', 'ENGINEERING_LEADS', 'BUSINESS_LEADS', 'OUTREACH_EDU_LEADS', 'ENGINEERING', 'OUTREACH_EDU', 'BUSINESS');
ALTER TABLE "Member" ALTER COLUMN "role" TYPE "MemberRole_new" USING ("role"::text::"MemberRole_new");
ALTER TYPE "MemberRole" RENAME TO "MemberRole_old";
ALTER TYPE "MemberRole_new" RENAME TO "MemberRole";
DROP TYPE "public"."MemberRole_old";
COMMIT;
