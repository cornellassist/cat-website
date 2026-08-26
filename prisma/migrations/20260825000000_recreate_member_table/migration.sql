-- CreateTable (skip if it already exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'Member'
  ) THEN
    CREATE TABLE "Member" (
        "id" SERIAL NOT NULL,
        "name" TEXT NOT NULL,
        "role" "MemberRole",
        "year" TEXT NOT NULL,
        "major" TEXT NOT NULL,
        "college" TEXT NOT NULL,
        CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
    );
  END IF;
END $$;

-- RenameEnumValues (skip if already renamed)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'MemberRole' AND e.enumlabel = 'OUTREACH_EDU_LEADS'
  ) THEN
    ALTER TYPE "MemberRole" RENAME VALUE 'OUTREACH_EDU_LEADS' TO 'OUTREACH_ADVO_LEADS';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'MemberRole' AND e.enumlabel = 'OUTREACH_EDU'
  ) THEN
    ALTER TYPE "MemberRole" RENAME VALUE 'OUTREACH_EDU' TO 'OUTREACH_ADVO';
  END IF;
END $$;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "role" DROP NOT NULL;
