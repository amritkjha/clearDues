# Architecture V1

## Overview

System follows event-driven job scheduling architecture.

Invoice Creation Flow:
1. API receives invoice creation request.
2. Invoice stored in database.
3. System fetches user's ReminderSchedules.
4. ReminderJobs created immediately.
5. Jobs pushed into Redis-backed BullMQ queue.
6. Worker processes queue at scheduled time.
7. Worker sends email and updates ReminderJob status.

## Why Immediate Job Creation?

- Predictable reminder lifecycle.
- Avoids daily polling jobs.
- Scales horizontally with workers.
- Easier to debug (jobs visible in DB).

## Queue System

- BullMQ
- Redis-backed
- Separate worker process
- Retry mechanism enabled (max 3 retries)
- Failed jobs logged with failureReason

## Security

- JWT-based authentication
- Rate limiting on invoice creation endpoints
- Input validation using Zod
- Environment variables required for:
  - DATABASE_URL
  - REDIS_URL
  - SMTP_HOST
  - SMTP_USER
  - SMTP_PASS
  - JWT_SECRET

## Redis Layer

Purpose:
Handles distributed job scheduling and delayed reminder execution.

Provider:
Upstash (Managed Redis – Free Tier)

Connection Strategy:
- Explicit initialization via initRedis()
- No side-effect imports
- TLS enabled (required for rediss://)
- Fail-fast if REDIS_URL is missing

Design Decision:
Redis is initialized during server startup, not during module import.
This avoids environment race conditions and improves stability.

Resilience:
- maxRetriesPerRequest: 3
- enableReadyCheck: false (prevents TLS readiness blocking)

### Validation Layer

- All request validation handled via Zod schemas.
- Validation middleware parses body, params, query.
- Controllers never contain validation logic.
- Zod errors forwarded to centralized error handler.