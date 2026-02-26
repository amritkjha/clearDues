# Backend Setup

## Tech Stack
- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL (planned)
- BullMQ + Redis (planned)

## Local Development

1. Navigate to backend folder
2. Run npm install
3. Create .env file
4. Run: npm run dev
5. Check health endpoint at /health

## Redis Setup

1. Create Redis instance on Upstash.
2. Copy REDIS_URL.
3. Add to backend/.env:

REDIS_URL="rediss://..."

4. Restart server.
5. Confirm "Redis connected" appears in logs.

Important:
TLS configuration is required for rediss:// connections.