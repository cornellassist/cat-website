import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const cols = await prisma.$queryRawUnsafe(`
  SELECT column_name, data_type, is_nullable
  FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'Member'
  ORDER BY ordinal_position;
`);
console.log("Member columns:", cols);

const count = await prisma.$queryRawUnsafe(`SELECT count(*) FROM "public"."Member";`);
console.log("Member row count:", count);

await prisma.$disconnect();
