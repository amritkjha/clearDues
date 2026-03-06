import { PrismaClient } from "@prisma/client";
console.log("=== PRISMA.TS DEBUG ===");
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("All env keys:", Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('PRISMA')));
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("================");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined! Check your .env file.");
}

// Helpful validation: an unencoded '@' in the password will break parsing of the connection string.
// If the DATABASE_URL contains more than one '@' character it likely means the password includes
// an unencoded '@' (e.g. `clearDues@2026`) — instruct user to URL-encode special characters.
const dbUrl = process.env.DATABASE_URL;
if ((dbUrl.match(/@/g) || []).length > 1) {
  throw new Error(
    "DATABASE_URL appears to contain an unencoded '@' (commonly from a password). " +
      "URL-encode special characters in the password (for example '@' -> '%40')."
  );
}

// Let Prisma client pick up DATABASE_URL from environment. Avoid passing `datasources` here
// (causes a TypeScript error and may be rejected by Prisma at runtime).
export const prisma = new PrismaClient();